import React from 'react';
import styles from './PageTemplate.module.scss';
import classNames from 'classnames/bind';
import HeaderContainer from 'containers/common/HeaderContainer';
import Footer from 'components/common/Footer';

const cx = classNames.bind(styles);

const PageTemplate = ({children, list}) => (
  <div className={cx('page-template', {list})}>
    <HeaderContainer />
    <main>
      {children}
    </main>
    <Footer />
  </div>
);

export default PageTemplate;
