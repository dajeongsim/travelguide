import React from 'react';
import styles from './Button.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Button = () => {
  return (
    <div className={cx('button')}></div>
  );
}

export default Button;
