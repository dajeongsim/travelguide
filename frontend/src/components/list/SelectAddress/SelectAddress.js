import React from 'react';
import styles from './SelectAddress.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const SelectAddress = () => {
  return (
    <div className={cx('select-address')}></div>
  );
}

export default SelectAddress;
