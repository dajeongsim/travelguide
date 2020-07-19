import React, { Component } from 'react';
import PostInfo from 'components/post/PostInfo';
import PostBody from 'components/post/PostBody';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as postActions from 'store/modules/post';

class PostContainer extends Component {
  componentDidMount() {
    const { postId } = this.props;
    const userId = localStorage.loggedInfo ? JSON.parse(localStorage.loggedInfo).userId : 0;
    const { PostActions } = this.props;

    PostActions.getPost({postId: postId, userId: userId});

    document.documentElement.scrollTop = 0;
  }

  componentDidUpdate(prevProps) {
    if(this.props.logged!==prevProps.logged) {
      const { postId } = this.props;
      const { userId } = this.props.loggedInfo;
      const { PostActions } = this.props;

      PostActions.getPost({postId: postId, userId: userId});
    }
  }

  handleGoBack = () => {
    const { history } = this.props;

    history.goBack();
  }

  handleScrap = () => {
    alert('추후 업데이트 될 예정입니다');
  }

  handleToggleLike = () => {
    const { postId, likes } = this.props;
    const { userId } = this.props.loggedInfo;
    const { postWriterId } = this.props.post;
    const { PostActions } = this.props;

    if (!userId) {
      alert('로그인 후 이용 가능합니다');
    } else if (userId===postWriterId) {
      alert('본인 글은 추천할 수 없습니다');
    } else {
      PostActions.toggleLike({targetId: postId, type: 1, userId, writerId: postWriterId, likes});
    }
  }

  handleBlame = () => {
    const { postId, blame } = this.props;
    const { userId } = this.props.loggedInfo;
    const { postWriterId } = this.props.post;
    const { PostActions } = this.props;

    if (!userId) {
      alert('로그인 후 이용 가능합니다');
    } else if (userId===postWriterId) {
      alert('본인 글은 신고할 수 없습니다');
    } else {
      if (blame) {
        alert('이미 신고한 게시글입니다');
      } else {
        PostActions.onBlame({targetId: postId, type: 1, userId, writerId: postWriterId});
      }
    }
  }

  render() {
    const { post, likes, blame, loading } = this.props;
    const { handleGoBack, handleScrap, handleToggleLike, handleBlame } = this;
    // postId, postTitle, postAddress, postBody, postTags, postCategory, postCategoryName, postPublishedDate, postWriter, postWriterId, postBlameCnt, postLikeCnt, postHits
    return (
      <div>
        {!loading&&<PostInfo title={post.postTitle} writer={post.postWriter} publishedDate={post.postPublishedDate} tags={post.postTags} likeCnt={post.postLikeCnt} hitcount={post.postHits} likes={likes} blame={blame} onGoBack={handleGoBack} onScrap={handleScrap} onToggleLike={handleToggleLike} onBlame={handleBlame} />}
        <PostBody address={post.postAddress} lat={post.postAddressLat} lng={post.postAddressLng} contents={post.postBody} />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    post: state.post.get('post').toJS(),
    likes: state.post.get('likes'),
    blame: state.post.get('blame'),
    loggedInfo: state.base.get('loggedInfo').toJS(),
    logged: state.base.get('logged'),
    loading: state.pender.pending['post/GET_POST']
  }),
  (dispatch) => ({
    PostActions: bindActionCreators(postActions, dispatch)
  })
)(withRouter(PostContainer));
