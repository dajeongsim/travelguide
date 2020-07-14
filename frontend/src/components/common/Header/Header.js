import React from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const Header = ({userMemId, logged, onLoginClick}) => (
  <header className={cx('header')}>
    <div className={cx('header-content')}>
      <div className={cx('logo')}>
        <Link to="/">travelguide</Link>
      </div>
      <div className={cx('right')}>
        {logged && <div className={cx('logged-user')}>{userMemId} 님</div>}
        <Button theme="outline" onClick={onLoginClick}>{logged ? '로그아웃' : '로그인'}</Button>
        {logged || <Button theme="outline" to="/register">회원가입</Button>}
      </div>
    </div>
  </header>
);

export default Header;
