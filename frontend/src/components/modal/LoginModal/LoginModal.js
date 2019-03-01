import React from 'react';
import styles from './LoginModal.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const LoginModal = () => {
  return (
    <div className={cx('login-modal')}></div>
  );
}

export default LoginModal;
