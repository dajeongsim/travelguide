const db = require('lib/db');

exports.cityList = async (ctx) => {
  const { category } = ctx.params;
  console.log(category);

  try {
    if (category==='prov') {
      const [rows] = await db.query('SELECT categoryId, categoryName FROM category WHERE categoryId=0 OR categoryParent=0');

      ctx.body = {rows, type:'p'}; // province
    } else {
      const [rows] = await db.query('SELECT categoryId, categoryName FROM category WHERE categoryId>="' + category + '" AND categoryId<"' + (parseInt(category, 10)+100) + '"');

      ctx.body = {rows, type:'c'}; // city
    }
    // const [rows] = await db.query('SELECT categoryId, categoryName FROM category WHERE categoryId>="' + category + '" AND categoryId<"' + (parseInt(category, 10)+100) + '"');

    // ctx.body = rows;
  } catch (e) {
    ctx.throw(e, 500);
  }
  // ctx.body = [{categoryId: 100, categoryName:'서울'},{categoryId: 1, categoryName: 'aa'}];
}

exports.tagList = async (ctx) => {
  try {
    const [rows] = await db.query('SELECT DISTINCT tagBody FROM tag ORDER BY tagBody ASC');
    console.log(rows);
    ctx.body = rows;
  } catch (e) {
    ctx.throw(e, 500);
  }
}

exports.postList = async (ctx) => {
  const { category, sltCities, tags, page } = ctx.query;
  const startPg = page===1 ? 0 : (page-1)*10;

  try {
    if (!category && sltCities) {
      // 태그별 선택 출력
      let str;
      if (Array.isArray(sltCities)) {
        for (var i = 0; i < sltCities.length; i++) {
          sltCities[i] = '"' + sltCities[i] + '"';
        }
        const temp = sltCities.toString();
        str = temp.substring(1, temp.length-1);
      } else {
        str = sltCities;
      }

      const [rows] = await db.query('SELECT DISTINCT p.postId, p.postCategoryName, p.postTitle, p.postWriter, p.postPublishedDate, p.postHits, p.postLikeCnt FROM post AS p JOIN tag AS t WHERE p.postId=t.tagPost AND (t.tagBody IN ("' + str + '")) ORDER BY postId DESC LIMIT ' + startPg + ', 10');

      const [cnt] = await db.query('SELECT count(DISTINCT p.postId) as cnt FROM post AS p JOIN tag AS t WHERE p.postId=t.tagPost AND (t.tagBody IN ("' + str + '"))');

      console.log('tag');
      console.log(cnt);
      ctx.body = {rows, cnt};
    } else if (category==='0' || !category) {
      // 전체 출력
      const [rows] = await db.query('SELECT postId, postCategoryName, postTitle, postWriter, postPublishedDate, postHits, postLikeCnt FROM post ORDER BY postId DESC LIMIT ' + startPg + ', 10');

      const [cnt] = await db.query('SELECT count(*) as cnt FROM post');

      console.log('1');
      console.log(cnt);
      ctx.body = {rows, cnt};
    } else if (!sltCities && category) {
      // 지역별 전체 줄력
      const [rows] = await db.query('SELECT p.postId, p.postCategoryName, p.postTitle, p.postWriter, p.postPublishedDate, p.postHits, p.postLikeCnt FROM post AS p JOIN category AS c WHERE p.postCategory=c.categoryId AND c.categoryParent="' + category + '" ORDER BY postId DESC LIMIT ' + startPg + ', 10');

      const [cnt] = await db.query('SELECT count(*) as cnt FROM post AS p JOIN category AS c WHERE p.postCategory=c.categoryId AND c.categoryParent="' + category + '"');

      console.log('2');
      console.log(cnt);
      ctx.body = {rows, cnt};
    } else {
      // 지역별 선택 출력
      const [rows] = await db.query('SELECT p.postId, p.postCategoryName, p.postTitle, p.postWriter, p.postPublishedDate, p.postHits, p.postLikeCnt FROM post AS p JOIN category AS c WHERE p.postCategory=c.categoryId AND (postCategory IN (' + sltCities.toString() + ') OR categoryParent IN (' + sltCities.toString() + ')) ORDER BY postId DESC LIMIT ' + startPg + ', 10');

      const [cnt] = await db.query('SELECT count(*) as cnt FROM post AS p JOIN category AS c WHERE p.postCategory=c.categoryId AND (postCategory IN (' + sltCities.toString() + ') OR categoryParent IN (' + sltCities.toString() + '))');

      console.log('3');
      console.log(cnt);
      ctx.body = {rows, cnt};
    }
  } catch (e) {
    ctx.throw(e, 500);
  }
}

exports.getPost = async (ctx) => {
  const { postId, userId } = ctx.params;

  console.log(postId+'/'+userId);

  try {
    const [rows] = await db.query(`SELECT * FROM post WHERE postId=${postId}`);

    const [likes] = await db.query(`SELECT count(*) as likes FROM likes WHERE likeTargetId=${postId} AND likeUserId=${userId}`);

    const [blame] = await db.query(`SELECT count(*) as blame FROM blame WHERE blameTargetId=${postId} AND blameUserId=${userId}`);

    ctx.body = {rows, likes, blame};
  } catch (e) {
    ctx.throw(e, 500);
  }
}

exports.writePost = async (ctx) => {
  //{title, category, address, contents, tags}
  const { title, address, coords, contents, tags, category, userId } = ctx.request.body;

  try {
    const [rows] = await db.query(`INSERT INTO post(postTitle, postAddress, postAddressLat, postAddressLng, postBody, postTags, postCategory, postCategoryName, postWriter, postWriterId) SELECT '${title}', '${address}', '${coords.latitude}', '${coords.longitude}', '${contents}', '${tags}', '${category}', c.categoryName, u.userMemId, '${userId}' FROM category AS c, user AS u WHERE c.categoryId=${category} AND u.userId=${userId}`);

    const tagList = tags.slice(1).split('#');

    var query = 'INSERT INTO tag(tagPost, tagBody) VALUES';
    for (let i = 0; i < tagList.length; i++) {
      if (i<tagList.length-1) {
        query += ` (${rows.insertId}, '${tagList[i]}'),`;
      } else {
        query += ` (${rows.insertId}, '${tagList[i]}');`;
      }
    }

    await db.query(query);

    ctx.body = rows;
  } catch (e) {
    ctx.throw(e, 500);
  }
}

exports.toggleLike = async (ctx) => {
  const { targetId, type, userId, writerId, likes } = ctx.request.body;
  let like, cnt;

  try {
    // 본인 글일 때 -> 좋아요, 신고 비활성화
    // 이미 좋아요, 신고를 누른 글일 때 -> 버튼 색 변경
    // 신고는 취소 불가

    // 중복 추천 체크
    const [check] = await db.query(`SELECT count(*) as chk FROM likes WHERE likeTargetId=${targetId} AND likeUserId=${userId} AND likeTargetType=${type}`);

    if (type===1) {
      // post like
      if (likes) {
        // 좋아요 취소
        await db.query(`DELETE FROM likes WHERE likeTargetId='${targetId}' AND likeUserId=${userId} AND likeTargetUserId=${writerId}`);

        like = 0;
      } else {
        // 좋아요
        // 중복 추천시 함수 종료
        if (check[0].chk===1) {
          return ;
        }

        await db.query(`INSERT INTO likes(likeTargetId, likeTargetType, likeUserId, likeTargetUserId) VALUES(${targetId}, ${type}, ${userId}, ${writerId})`);

        like = 1;
      }
      // post의 추천 수 업데이트
      await db.query(`UPDATE post SET postLikeCnt=(SELECT count(*) FROM likes WHERE likeTargetId=${targetId} AND likeTargetType=${type}) WHERE postId=${targetId}`);

      [cnt] = await db.query(`SELECT count(*) as cnt FROM likes WHERE likeTargetId=${targetId} AND likeTargetType=${type}`);

    } else if (type===2) {
      // comment like INSERT 추후 작성
    }

    ctx.body = {like, cnt};
  } catch (e) {
    ctx.throw(e, 500);
  }
}

exports.blame = async (ctx) => {
  const { targetId, type, userId, writerId } = ctx.request.body;
  let cnt;

  try {
    if (type===1) {
      // 신고
      await db.query(`INSERT INTO blame(blameTargetId, blameTargetType, blameUserId, blameTargetUserId) VALUES(${targetId}, ${type}, ${userId}, ${writerId})`);

      // post의 신고 수 업데이트
      await db.query(`UPDATE post SET postBlameCnt=(SELECT count(*) FROM blame WHERE blameTargetId=${targetId} AND blameTargetType=${type}) WHERE postId=${targetId}`);

      [cnt] = await db.query(`SELECT count(*) as cnt FROM blame WHERE blameTargetId=${targetId} AND blameTargetType=${type}`);

    } else if (type===2) {
      // comment blame INSERT 추후 작성
    }

    ctx.body = {cnt};
  } catch (e) {
    ctx.throw(e, 500);
  }
}
