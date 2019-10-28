import React from 'react';
import styles from './ListWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ListWrapper = ({category, list}) => (
  <div className={cx('list-wrapper')}>
    {category}
    <div className={cx('list-content')}>
      {list}
    </div>
  </div>
);

export default ListWrapper;
