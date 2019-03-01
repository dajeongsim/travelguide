import React from 'react';
import styles from './MainBody.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const MainBody = () => {
  return (
    <div className={cx('main-body')}></div>
  );
}

export default MainBody;
