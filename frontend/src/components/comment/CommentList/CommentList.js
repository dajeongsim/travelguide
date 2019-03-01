import React from 'react';
import styles from './CommentList.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const CommentList = () => {
  return (
    <div className={cx('comment-list')}></div>
  );
}

export default CommentList;
