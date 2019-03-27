import React from 'react';
import styles from './SelectAddress.scss';
import classNames from 'classnames/bind';
// import { Link } from 'react-router-dom';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const SelectAddress = ({cities=[{categoryId: 1, categoryName: 'aa'},
                                {categoryId: 2, categoryName: 'bb'},
                                {categoryId: 3, categoryName: 'cc'},
                                {categoryId: 4, categoryName: 'dd'},
                                {categoryId: 5, categoryName: 'ee'}]}) => {
  const cityList = cities.map(
    (city) => {
      const { categoryId, categoryName } = city;
      return (
        <li key={categoryId}>{categoryName}</li>
      );
    }
  );

  return (
    <div className={cx('select-address')}>
      <div className={cx('address-province')}>시·도명</div>
      <div className={cx('address-city')}>
        <span>시·구·군</span>
        <div className={cx('city-list')}>
          <ul>
            {cityList}
          </ul>
        </div>
      </div>
      <div className={cx('btn')}>
        <Button>&nbsp;초기화&nbsp;</Button>
        <Button>&nbsp;&nbsp;검색&nbsp;&nbsp;</Button>
      </div>
    </div>
  );
}

export default SelectAddress;
