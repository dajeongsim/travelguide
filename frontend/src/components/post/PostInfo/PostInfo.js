import React from 'react';
import styles from './PostInfo.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const PostInfo = () => {
  return (
    <div className={cx('post-info')}></div>
  );
}

export default PostInfo;
