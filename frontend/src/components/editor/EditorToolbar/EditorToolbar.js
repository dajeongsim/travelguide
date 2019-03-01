import React from 'react';
import styles from './EditorToolbar.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const EditorToolbar = () => {
  return (
    <div className={cx('editor-toolbar')}></div>
  );
}

export default EditorToolbar;
