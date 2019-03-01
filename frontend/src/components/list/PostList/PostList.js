import React from 'react';
import styles from './PostList.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const PostList = () => {
  return (
    <div className={cx('post-list')}></div>
  );
}

export default PostList;
