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
