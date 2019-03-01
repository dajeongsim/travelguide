import React from 'react';
import styles from './Header.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Header = () => {
  return (
    <div className={cx('header')}></div>
  );
}

export default Header;
