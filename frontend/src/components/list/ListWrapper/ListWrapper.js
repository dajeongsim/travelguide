import React from 'react';
import styles from './ListWrapper.scss';
import classNames from 'classnames/bind';
import Category from 'components/list/Category';
import SelectAddress from 'components/list/SelectAddress';
import PostList from 'components/list/PostList';
import Pagination from 'components/list/Pagination';

const cx = classNames.bind(styles);

const ListWrapper = () => (
  <div className={cx('list-wrapper')}>
    <Category />
    <div className={cx('list-content')}>
      <SelectAddress />
      <PostList />
      <Pagination />
    </div>
  </div>
);

export default ListWrapper;
