import React from 'react';
import styles from './CommentList.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const CommentItem = ({id, writer, dateTime, parent, body}) => {
  return (
    <div className={cx('comment-item', {parent})}>
      <div className={cx('writer')}>작성자</div>
      <div className={cx('date-time')}>연.월.일.시간</div>
      {parent || <div className={cx('reply')}>⊕답글</div>}
      <div className={cx('body')}>내용</div>
    </div>
  );
}

const CommentList = () => {
  return (
    <div className={cx('comment-list')}>
      <CommentItem />
      <CommentItem parent />
      <CommentItem />
    </div>
  );
}

export default CommentList;
