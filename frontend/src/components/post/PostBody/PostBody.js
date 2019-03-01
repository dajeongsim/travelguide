import React from 'react';
import styles from './PostBody.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const PostBody = () => {
  return (
    <div className={cx('post-body')}></div>
  );
}

export default PostBody;
