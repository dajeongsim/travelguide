import React from 'react';
import styles from './Register.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const Register = ({userInfo, error, onChangeInput, onRegister}) => {
  return (
    <div className={cx('register')}>
      <h2>회원가입</h2>
      <div className={cx('login-info')}>
        <input type="text" placeholder="ID" name="id" value={userInfo.id} onChange={onChangeInput} />
        <input type="password" placeholder="PASSWORD" name="password" value={userInfo.password} onChange={onChangeInput} />
        <input type="password" placeholder="PASSWORD CHECK" name="passwordConfirm" value={userInfo.passwordConfirm} onChange={onChangeInput} />
      </div>
      <div className={cx('user-info')}>
        <input type="text" placeholder="NAME" name="name" value={userInfo.name} onChange={onChangeInput} />
        <input type="text" placeholder="E-MAIL" name="email" value={userInfo.email} onChange={onChangeInput} />
      </div>
      {<div className={cx('error')}>{error}</div>}
      <Button big onClick={onRegister}>가입하기</Button>
    </div>
  );
}

export default Register;
