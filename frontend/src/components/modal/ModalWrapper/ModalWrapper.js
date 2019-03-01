import React from 'react';
import styles from './ModalWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ModalWrapper = () => {
  return (
    <div className={cx('modal-wrapper')}></div>
  );
}

export default ModalWrapper;
