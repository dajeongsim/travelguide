import React from 'react';
import styles from './MainWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const MainWrapper = () => {
  return (
    <div className={cx('main-wrapper')}></div>
  );
}

export default MainWrapper;
