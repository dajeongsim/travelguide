import React from 'react';
import styles from './CommentTemplate.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const CommentTemplate = () => {
  return (
    <div className={cx('comment-template')}></div>
  );
}

export default CommentTemplate;
