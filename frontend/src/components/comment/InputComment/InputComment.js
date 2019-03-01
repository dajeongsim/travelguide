import React from 'react';
import styles from './InputComment.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const InputComment = () => {
  return (
    <div className={cx('input-comment')}></div>
  );
}

export default InputComment;
