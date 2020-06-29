import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import PostContainer from 'containers/post/PostContainer';
import CommentTemplate from 'components/comment/CommentTemplate';

const PostPage = ({match}) => {
  const { id } = match.params;
  return (
    <PageTemplate>
      <PostContainer postId={id} />
      <CommentTemplate />
    </PageTemplate>
  );
}

export default PostPage;
