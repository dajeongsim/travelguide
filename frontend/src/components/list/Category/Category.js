import React from 'react';
import styles from './Category.scss';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

const Category = () => (
  <div className={cx('category')}>
    <div className={cx('category-title')}>지역별</div>
    <hr />
    <ul>
      <li><NavLink to={`/category=0/page/`} activeClassName={cx('active')}>전국</NavLink></li>
      <li><NavLink to={`/category=100/page/`} activeClassName={cx('active')}>서울</NavLink></li>
      <li><NavLink to={`/category=200/page/`} activeClassName={cx('active')}>부산</NavLink></li>
      <li><NavLink to={`/category=300/page/`} activeClassName={cx('active')}>대구</NavLink></li>
      <li><NavLink to={`/category=400/page/`} activeClassName={cx('active')}>인천</NavLink></li>
      <li><NavLink to={`/category=500/page/`} activeClassName={cx('active')}>광주</NavLink></li>
      <li><NavLink to={`/category=600/page/`} activeClassName={cx('active')}>대전</NavLink></li>
      <li><NavLink to={`/category=700/page/`} activeClassName={cx('active')}>울산</NavLink></li>
      <li><NavLink to={`/category=800/page/`} activeClassName={cx('active')}>세종</NavLink></li>
      <li><NavLink to={`/category=900/page/`} activeClassName={cx('active')}>경기</NavLink></li>
      <li><NavLink to={`/category=1000/page/`} activeClassName={cx('active')}>강원</NavLink></li>
      <li><NavLink to={`/category=1100/page/`} activeClassName={cx('active')}>충북</NavLink></li>
      <li><NavLink to={`/category=1200/page/`} activeClassName={cx('active')}>충남</NavLink></li>
      <li><NavLink to={`/category=1300/page/`} activeClassName={cx('active')}>전북</NavLink></li>
      <li><NavLink to={`/category=1400/page/`} activeClassName={cx('active')}>전남</NavLink></li>
      <li><NavLink to={`/category=1500/page/`} activeClassName={cx('active')}>경북</NavLink></li>
      <li><NavLink to={`/category=1600/page/`} activeClassName={cx('active')}>경남</NavLink></li>
      <li><NavLink to={`/category=1700/page/`} activeClassName={cx('active')}>제주</NavLink></li>
      <li><hr /></li>
      <li><NavLink to={`/tag/:tag/`} activeClassName={cx('active')}>태그 모음</NavLink></li>
    </ul>
  </div>
);

export default Category;
