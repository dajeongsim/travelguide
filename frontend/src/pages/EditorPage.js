import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import EditorPaneContainer from 'containers/editor/EditorPaneContainer';
// import EditorPane from 'components/editor/EditorPane';

const EditorPage = () => {
  return (
    <PageTemplate>
      <EditorPaneContainer />
      {/* <EditorPane /> */}
    </PageTemplate>
  );
}

export default EditorPage;
