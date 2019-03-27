import React from 'react';
import styles from './Pagination.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const Pagination = ({page=1, lastPage=15, tag, category=0}) => {
  const createPagePath = (page) => {
    return tag ? `/tag/${tag}/${page}` : `/category=${category}/page/${page}`;
  }

  const pageList = [];
  for (let i=0; i<lastPage; i++) {
    pageList[i] = <Link to={createPagePath(i+1)}>{i+1}</Link>
  }

  const sPage = Math.floor((page - 1) / 5) * 5;
  const ePage = Math.floor((page - 1) / 5) * 5 + 5;

  return (
    <div className={cx('pagination')}>
      <Button disabled={page === 1} to={createPagePath(1)}>
        첫페이지
      </Button>
      <Button disabled={page <= 5} to={createPagePath(Math.floor((page-1) / 5) * 5)}>
      ◁
      </Button>
      <div className={cx('number')}>
        {pageList.slice(sPage, ePage)}
      </div>
      <Button disabled={(lastPage % 5) ? page > Math.floor(lastPage / 5) * 5 : page > Math.floor(lastPage / 5 - 1) * 5} to={createPagePath(Math.floor((page-1) / 5 + 1) * 5 + 1)}>
      ▷
      </Button>
      <Button disabled={page === lastPage} to={createPagePath(lastPage)}>
        마지막페이지
      </Button>
    </div>
  );
};

export default Pagination;
