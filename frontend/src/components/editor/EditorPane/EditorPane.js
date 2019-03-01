import React from 'react';
import styles from './EditorPane.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const EditorPane = () => {
  return (
    <div className={cx('editor-pane')}></div>
  );
}

export default EditorPane;
