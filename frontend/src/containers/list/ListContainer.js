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
    const { category, sltCities, ListActions } = this.props;
    const sltCitiesJs = sltCities.toJS();

    for (var i = 0; i < sltCitiesJs.length; i++) {
      document.getElementById(sltCitiesJs[i]).setAttribute('class', 'slt-cities');
    }

    this.listType = 'c'

    ListActions.getCityList(category);
  }

  getPostList = () => {
    const { category, sltCities, page, ListActions } = this.props;
    const sltCitiesJs = sltCities.toJS();

    ListActions.getPostList({category, sltCities: sltCitiesJs, page});
  }

  getTagList = () => {
    const { ListActions } = this.props;

    this.listType = 't'

    ListActions.getTagList();
  }

  handleSelect = (e) => {
    const { ListActions } = this.props;

    if (e.target.className!=='slt-cities') {
      e.target.className = 'slt-cities';
    } else {
        e.target.className = '';
    }

    ListActions.selectCity(e.target.id);
  }

  handleReset = () => {
    const { ListActions } = this.props;
    const element = document.getElementsByClassName('slt-cities');

    for(var i = element.length-1; i >= 0; i--) {
      element.item(i).setAttribute('class', '');
    }

    ListActions.resetCity();
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
    const { category, tags, cities, sltCities, posts, page, cnt, lastPage } = this.props;
    return (
      <div>
        <SelectAddress cities={cities} tags={tags} listType={this.listType} category={category} sltCities={sltCities} onSelect={this.handleSelect} onReset={this.handleReset} onSearch={this.handleSearch} />
        <PostList posts={posts} cnt={cnt} />
        <Pagination category={category} page={page} lastPage={lastPage} sltCities={sltCities} />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    cities: state.list.get('cities'),
    sltCities: state.list.get('sltCities'),
    tags: state.list.get('tags'),
    posts: state.list.get('posts'),
    cnt : state.list.get('cnt'),
    lastPage: state.list.get('lastPage')
  }),
  (dispatch) => ({
    ListActions: bindActionCreators(listActions, dispatch)
  })
)(ListContainer);
