import React from 'react';
import styles from './PostList.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const PostList = () => {
  return (
    <div className={cx('post-list')}>
      <div className={cx('list-header')}>
        <span>### 건 검색됨</span>
        <div className={cx('right')}>
        <Button to="/editor">작성하기</Button>
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
          {/* 임시 */}
          <tr>
            <td>♡ 경기 광주시</td>
            <td>남한산성</td>
            <td>admin</td>
            <td>2019.03.26</td>
            <td>1</td>
            <td>0</td>
          </tr>
          <tr>
            <td>♡ 경기 광주시</td>
            <td>남한산성</td>
            <td>admin</td>
            <td>2019.03.26</td>
            <td>1</td>
            <td>0</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PostList;
