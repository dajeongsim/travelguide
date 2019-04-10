import React from 'react';
import styles from './PageTemplate.module.scss';
import classNames from 'classnames/bind';
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';

const cx = classNames.bind(styles);

const PageTemplate = ({children, list}) => (
  <div className={cx('page-template', {list})}>
    <Header />
    <main>
      {children}
    </main>
    <Footer />
  </div>
);

export default PageTemplate;
