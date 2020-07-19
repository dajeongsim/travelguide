import React from 'react';
import styles from './PostList.scss';
import classNames from 'classnames/bind';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const PostList = ({posts, cnt, onWrite}) => {
  const postList = posts.map(
    (post) => {
      const { postId, postCategoryName, postTitle, postWriter, postPublishedDate, postHits, postLikeCnt } = post.toJS();
      return (
          <tr key={postId}>
            <td>{postCategoryName}</td>
            <td>
              <Link to={`/post/${postId}`}>{postTitle}</Link>
            </td>
            <td>{postWriter}</td>
            <td>{moment(postPublishedDate).format('YYYY.MM.DD')}</td>
            <td>{postHits}</td>
            <td>{postLikeCnt}</td>
          </tr>
      );
    }
  )

  return (
    <div className={cx('post-list')}>
      <div className={cx('list-header')}>
        <span>{cnt} 건 검색됨</span>
        <div className={cx('right')}>
        <Button onClick={onWrite}>작성하기</Button>
        </div>
      </div>
      <table className={cx('list')}>
        <caption>게시글 목록</caption>
        <colgroup>
          <col width="100px"/>
          <col width="*"/>
          <col width="100px"/>
          <col width="90px"/>
          <col width="50px"/>
          <col width="50px"/>
        </colgroup>
        <thead>
          <tr>
            <th>지역</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>조회수</th>
            <th>추천</th>
          </tr>
        </thead>
        <tbody>
          {postList}
        </tbody>
      </table>
    </div>
  );
}

export default PostList;
