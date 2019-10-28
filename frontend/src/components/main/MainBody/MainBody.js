import React from 'react';
import styles from './MainBody.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const MainBody = () => (
  <div className={cx('main-body')}>
    <div className={cx('main-content')}>
      <p className={cx('p1')}><span>우리</span>의 손으로</p>
      <p className={cx('p2')}><span>우리</span>가 만드는</p>
      <p className={cx('p3')}><span>우리</span>의 여행</p>
      <p className={cx('p4')}>지금 바로 시작하세요</p>
    </div>
    <div className={cx('main-btn')}>
      <Button to='/category=0/page/1' big>전체보기</Button>
    </div>
  </div>
);

export default MainBody;
