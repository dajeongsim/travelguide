import React from 'react';
import styles from './InputComment.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const InputComment = () => {
  return (
    <div className={cx('input-comment')}>
      <textarea className={cx('input-body')} placeholder="댓글을 입력하세요."></textarea>
      <div className={cx('btn')}><Button>&nbsp;작성&nbsp;</Button></div>
    </div>
  );
}

export default InputComment;
