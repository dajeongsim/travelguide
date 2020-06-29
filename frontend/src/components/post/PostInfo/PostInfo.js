import React from 'react';
import styles from './PostInfo.scss';
import classNames from 'classnames/bind';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Button from 'components/common/Button';
import * as img from 'img';

const cx = classNames.bind(styles);

const PostInfo = ({title, writer, publishedDate, tags, likeCnt, hitcount, likes, blame, onGoBack, onScrap, onToggleLike, onBlame}) => {

  const tagList = tags ? tags.slice(1).split('#').map(
    (tag) => {
      return <Link to={`/tag/${tag}/1`} className={cx('tag')} key={tag}>#{tag}</Link>;
    }
  ) : tags;

  return (
    <div className={cx('post-info')}>
      <div className={cx('info')}>
        <div className={cx('left')}>
          <h1>{title}</h1>
          <div className={cx('tags')}>{tagList}</div>
          <div className={cx('other-buttons')}>
            <div className={cx('scrap')}><img src={img.scrap} alt="스크랩" title="스크랩" onClick={onScrap} /></div>
            <div><img src={likes ? img.like1 : img.like} alt="추천" title="추천" className={cx({likes})} id="likes" onClick={onToggleLike} /></div>
            <div><img src={blame ? img.blame1 : img.blame} alt="신고" title="신고" className={cx({blame})} onClick={onBlame} /></div>
          </div>
        </div>
        <div className={cx('right')}>
          <div className={cx('btn')}><Button theme="outline" onClick={onGoBack}>목록으로</Button></div>
          <div className={cx('date')}>{moment(publishedDate).format('YYYY.MM.DD')}</div>
          <div className={cx('writer')}>{writer}</div>
          <div className={cx('hit-like')}>조회수 {hitcount} | 추천수 {likeCnt}</div>
        </div>
      </div>
    </div>
  );
}

export default PostInfo;
