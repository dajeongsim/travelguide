import React from 'react';
import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Footer = () => (
  <footer className={cx('footer')}>
    <Link to="/" className={cx('logo')}>travelguide</Link>
    <div className={cx('dev-info')}>
      <ul>
        <li># INFOMATION</li>
        <li>Name: 심다정</li>
        <li>Email: sdj8815@naver.com</li>
        <li>Git Hub: https://github.com/dajeongsim</li>
      </ul>
    </div>
  </footer>
);

export default Footer;
