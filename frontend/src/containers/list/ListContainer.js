import React, { Component } from 'react';
import PostList from 'components/list/PostList';
import Pagination from 'components/list/Pagination';
import SelectAddress from 'components/list/SelectAddress';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as listActions from 'store/modules/list';

class ListContainer extends Component {
  listType = '';

  getCityList = () => {
    const { category, sltProv, ListActions } = this.props;
    const sltProvJs = sltProv.toJS();

    for (var i = 0; i < sltProvJs.length; i++) {
      document.getElementById(sltProvJs[i]).setAttribute('class', 'slt-prov');
    }

    this.listType = 'c'

    ListActions.getCityList(category);
  }

  getPostList = () => {
    const { category, sltProv, page, ListActions } = this.props;
    const sltProvJs = sltProv.toJS();

    ListActions.getPostList({category, sltProv: sltProvJs, page});
  }

  getTagList = () => {
    const { ListActions } = this.props;

    this.listType = 't'

    ListActions.getTagList();
  }

  handleSelect = (e) => {
    const { ListActions } = this.props;

    if (e.target.className!=='slt-prov') {
      e.target.className = 'slt-prov';
    } else {
        e.target.className = '';
    }

    ListActions.selectProvince(e.target.id);
  }

  handleReset = () => {
    const { ListActions } = this.props;
    const element = document.getElementsByClassName('slt-prov');

    for(var i = element.length-1; i >= 0; i--) {
      element.item(i).setAttribute('class', '');
    }

    ListActions.resetProvince();
  }

  handleSearch = () => {
    this.getPostList();
  }

  componentDidMount() {
    this.getCityList();
    this.getPostList();
    if(!this.props.category) {
      this.getTagList();
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.category !== this.props.category) {
      await this.handleReset();
      this.props.category ? this.getCityList() : this.getTagList();
      this.getPostList();
    }
    if(prevProps.page !== this.props.page) {
      this.getPostList();
    }
    // 스크롤바를 맨 위로 올린다.
    document.documentElement.scrollTop = 0;
  }

  render() {
    const { category, tags, cities, sltProv, posts, page, cnt, lastPage } = this.props;
    return (
      <div>
        <SelectAddress cities={cities} tags={tags} listType={this.listType} category={category} sltProv={sltProv} onSelect={this.handleSelect} onReset={this.handleReset} onSearch={this.handleSearch} />
        <PostList posts={posts} cnt={cnt} />
        <Pagination category={category} page={page} lastPage={lastPage} sltProv={sltProv} />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    cities: state.list.get('cities'),
    sltProv: state.list.get('sltProv'),
    tags: state.list.get('tags'),
    posts: state.list.get('posts'),
    cnt : state.list.get('cnt'),
    lastPage: state.list.get('lastPage')
  }),
  (dispatch) => ({
    ListActions: bindActionCreators(listActions, dispatch)
  })
)(ListContainer);
