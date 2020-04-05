import React, { Component } from 'react';
import EditorPane from 'components/editor/EditorPane';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as editorActions from 'store/modules/editor';
// import * as listActions from 'store/modules/list';

class EditorPaneContainer extends Component {
  handleGoBack = () => {
    const { history } = this.props;

    history.goBack();
  }

  handleChangeInput = ({name, value}) => {
    const { EditorActions } = this.props;

    EditorActions.changeInput({name, value});
  }

  handleSubmit = async () => {
    const { title, address, contents, tags, category, history } = this.props;
    const { EditorActions } = this.props;

    await EditorActions.writePost({title, address, contents, tags, category, userId: 1});
    history.push(`/post/${this.props.postId}`);
  }

  getCategoryList = (ct1) => {
    const { EditorActions } = this.props;

    EditorActions.getCategoryList(ct1);
  }

  componentDidMount() {
    const { EditorActions } = this.props;

    EditorActions.initialize();

    this.getCategoryList('prov');
    this.getCategoryList(0);
  }

  render() {
    const { title, address, contents, tags, categories, categories2, category } = this.props;
    const { handleGoBack, handleChangeInput, handleSubmit, getCategoryList } = this;
    console.log(title+address+contents+tags+category);

    return (
      <EditorPane title={title} address={address} tags={tags} provs={categories} provs2={categories2} onGoBack={handleGoBack} onChangeInput={handleChangeInput} onSubmit={handleSubmit} getCategoryList={getCategoryList} />
    );
  }
}

export default connect(
  (state) => ({
    title: state.editor.get('title'),
    categories: state.editor.get('categories'),
    categories2: state.editor.get('categories2'),
    category: state.editor.get('category'),
    address: state.editor.get('address'),
    contents: state.editor.get('contents'),
    tags: state.editor.get('tags'),
    postId: state.editor.get('postId')
  }),
  (dispatch) => ({
    EditorActions: bindActionCreators(editorActions, dispatch)
  })
)(withRouter(EditorPaneContainer));
