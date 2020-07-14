import React from 'react';
import styles from './LoginModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';
import * as img from 'img';

const cx = classNames.bind(styles);

const LoginModal = ({
  visible, id, password, error, onCancel, onLogin, onChange, onCheckInput, onKeyPress
}) => (
  <ModalWrapper visible={visible}>
    <div className={cx('login-modal')}>
      <div onClick={onCancel} className={cx('close')}>&times;</div>
      <div className={cx('title')}>travelguide</div>
      <input autoFocus type="text" name="id" placeholder="아이디" value={id} onChange={onChange} onKeyPress={onKeyPress} />
      <input type="password" name="password" placeholder="비밀번호" value={password} onChange={onChange} onKeyPress={onKeyPress} />
      {
        (()=>{ switch (error) {
          case 1: return <div className={cx('error')}>아이디가 존재하지 않습니다.</div>;
          case 2: return <div className={cx('error')}>비밀번호가 일치하지 않습니다.</div>;
          case 3: return <div className={cx('error')}>아이디를 입력해주세요.</div>;
          case 4: return <div className={cx('error')}>비밀번호를 입력해주세요.</div>;
          default: break;
        } })()
      }
      <div onClick={
        async () => {
          await onCheckInput();
          onLogin();
        }
      } className={cx('login')}>로그인</div>
      <div className={cx('sns-title')}>--------- SNS 계정으로 로그인 ---------</div>
      <div className={cx('sns-login')}>
        <li><img src={img.symbol_naver} alt="네이버로그인" title="네이버로그인" /></li>
        <li><img src={img.symbol_google} alt="구글로그인" title="구글로그인" /></li>
        <li><img src={img.symbol_kakao} alt="카카오로그인" title="카카오로그인" /></li>
      </div>
    </div>
  </ModalWrapper>
);

export default LoginModal;
