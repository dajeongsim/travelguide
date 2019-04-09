import React from 'react';
import styles from './PostInfo.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const PostInfo = () => {
  return (
    <div className={cx('post-info')}>
      <div className={cx('info')}>
        <div className={cx('left')}>
          <h1>title</h1>
          <div className={cx('tags')}>#태그</div>
          <div className={cx('other-buttons')}>
            <div className={cx('scrap')}>스크랩</div>
            <div className={cx('like')}>좋아요</div>
            <div className={cx('blame')}>신고</div>
          </div>
        </div>
        <div className={cx('right')}>
          <div className={cx('btn')}><Button theme="outline">목록으로</Button></div>
          <div className={cx('date')}>날짜</div>
          <div className={cx('writer')}>작성자</div>
          <div className={cx('hit-like')}>조회수 | 추천수</div>
        </div>
      </div>
    </div>
  );
}

export default PostInfo;
