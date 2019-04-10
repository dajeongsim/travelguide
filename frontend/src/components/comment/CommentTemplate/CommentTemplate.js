import React from 'react';
import styles from './CommentTemplate.scss';
import classNames from 'classnames/bind';
import CommentList from 'components/comment/CommentList';
import InputComment from 'components/comment/InputComment';

const cx = classNames.bind(styles);

const CommentTemplate = () => {
  return (
    <div className={cx('comment-template')}>
      <CommentList />
      <InputComment />
    </div>
  );
}

export default CommentTemplate;
