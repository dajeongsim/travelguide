import React from 'react';
import styles from './Category.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Category = () => {
  return (
    <div className={cx('category')}></div>
  );
}

export default Category;
