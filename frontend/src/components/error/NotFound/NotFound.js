import React from 'react';
import styles from './NotFound.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const NotFound = () => (
  <div className={cx('not-found')}>
    <p>요청하신 페이지는 존재하지 않습니다.</p>
    <p className={cx('txt')}>404 Not Found</p>
    <Button to="/" big>메인으로</Button>
  </div>
);

export default NotFound;
