import React from 'react';
import styles from './LoginModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';

const cx = classNames.bind(styles);

const LoginModal = ({
  visible, password, error, onCancel, onLogin, onChange, onKeyPress
}) => (
  // <ModalWrapper visible={visible}>
  <ModalWrapper visible={true}>
    <div className={cx('login-modal')}>
      <div onClick={onCancel} className={cx('close')}>&times;</div>
      <div className={cx('title')}>travelguide</div>
      <input autoFocus type="text" placeholder="아이디" onChange={onChange} onKeyPress={onKeyPress} />
      <input type="password" placeholder="비밀번호" value={password} onChange={onChange} onKeyPress={onKeyPress} />
      {/* error && <div className={cx('error')}>로그인 실패</div> */}
      {
        (()=>{ switch (error) {
          case 1: return <div className={cx('error')}>아이디가 존재하지 않습니다.</div>;
          case 2: return <div className={cx('error')}>비밀번호가 일치하지 않습니다.</div>;
          case 3: return <div className={cx('error')}>아이디를 입력해주세요.</div>;
          case 4: return <div className={cx('error')}>비밀번호를 입력해주세요.</div>;
          default: break;
        } })()
      }
      <div onClick={onLogin} className={cx('login')}>로그인</div>
      {/* 임시 */}
      <div className={cx('sns-login')}>
        <li>N</li>
        <li>F</li>
        <li>G</li>
      </div>
    </div>
  </ModalWrapper>
);

export default LoginModal;
