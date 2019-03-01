import React from 'react';
import styles from './Map.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Map = () => {
  return (
    <div className={cx('map')}></div>
  );
}

export default Map;
