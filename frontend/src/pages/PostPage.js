import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import PostInfo from 'components/post/PostInfo';
import PostBody from 'components/post/PostBody';
import CommentTemplate from 'components/comment/CommentTemplate';

const PostPage = () => {
  return (
    <PageTemplate>
      <PostInfo />
      <PostBody />
      <CommentTemplate />
    </PageTemplate>
  );
}

export default PostPage;
