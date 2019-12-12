import React from 'react';
import styles from './SelectAddress.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const SelectAddress = ({cities, tags, category, listType, sltCities, onSelect, onReset, onSearch}) => {
  const cityList = cities.toJS().map(
    (city) => {
      const { categoryId, categoryName } = city;
      return (
        <li onClick={onSelect} id={categoryId} key={categoryId}>{categoryName}</li>
      );
    }
  );

  const tagList = tags.toJS().map(
    (tag) => {
      return (
        <li onClick={onSelect} id={tag} key={escape(tag)}>{tag}</li>
      )
    }
  )

  const province = (cities.getIn([0, 'categoryName']) + '').substring(0,2);
  return (
    <div className={cx('select-address')}>
      <div className={cx('address-province')}>{listType === 'c' ? province : '태그 모음'}</div>
      <div className={cx('address-city')}>
        {listType === 'c' && <span>시·구·군</span>}
        <div className={cx('city-list')}>
          <ul>
            {listType === 'c' ? cityList : tagList}
          </ul>
        </div>
      </div>
      <div className={cx('btn')}>
        <Button onClick={onReset}>&nbsp;초기화&nbsp;</Button>
        <Button to={listType === 'c' ? `1?sCategory=${sltCities.toJS()}` : (sltCities.toJS().length > 0 ? `/tag/${sltCities.toJS()}/1` : `/tag/:tag/1`)} onClick={onSearch}>&nbsp;&nbsp;검색&nbsp;&nbsp;</Button>
      </div>
    </div>
  );
}

export default SelectAddress;
