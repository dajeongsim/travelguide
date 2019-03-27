import React from 'react';
import styles from './Register.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const Register = () => {
  return (
    <div className={cx('register')}>
      <h2>회원가입</h2>
      <div className={cx('login-info')}>
        <input type="text" placeholder="ID" />
        <input type="text" placeholder="PASSWORD" />
        <input type="text" placeholder="PASSWORD CHECK" />
      </div>
      <div className={cx('user-info')}>
        <input type="text" placeholder="NAME" />
        <input type="text" placeholder="E-MAIL" />
      </div>
      <Button big>가입하기</Button>
    </div>
  );
}

export default Register;
