import React from 'react';
import styles from './Pagination.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Pagination = () => {
  return (
    <div className={cx('pagination')}></div>
  );
}

export default Pagination;
