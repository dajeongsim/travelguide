import React from 'react';
import styles from './ListWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ListWrapper = () => {
  return (
    <div className={cx('list-wrapper')}></div>
  );
}

export default ListWrapper;
