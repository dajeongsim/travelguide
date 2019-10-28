import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';

// action types
const GET_CITY_LIST = 'GET_CITY_LIST';
const GET_TAG_LIST = 'GET_TAG_LIST';
const GET_POST_LIST = 'GET_POST_LIST';
const SELECT_PROVINCE = 'SELECT_PROVINCE';
const RESET_PROVINCE = 'RESET_PROVINCE';

// action creators
export const getCityList = createAction(GET_CITY_LIST, api.getCityList);
export const getTagList = createAction(GET_TAG_LIST, api.getTagList);
export const getPostList = createAction(GET_POST_LIST, api.getPostList, meta => meta);
export const selectProvince = createAction(SELECT_PROVINCE);
export const resetProvince = createAction(RESET_PROVINCE);

// initial state
const initialState = Map({
  cities: List(),
  sltProv: List(),
  tags: List(),
  posts: List(),
  cnt : null,
  lastPage: null
});

// reducer
export default handleActions({
  ...pender({
    type: GET_CITY_LIST,
    onSuccess: (state, action) => {
      const { data: cities } = action.payload;

      return state.set('cities', fromJS(cities));
    }
  }),
  ...pender({
    type: GET_TAG_LIST,
    onSuccess: (state, action) => {
      const { data: tags } = action.payload;
      let temp = [];

      for (var i = 0; i < tags.length; i++) {
          temp.push(tags[i].tagBody);
      }

      console.log(temp);

      return state.set('tags', fromJS(temp));
    }
  }),
  ...pender({
    type: GET_POST_LIST,
    onSuccess: (state, action) => {
      const { rows: posts } = action.payload.data;
      const { cnt } = action.payload.data;

      return state.set('posts', fromJS(posts))
                  .set('cnt', parseInt(cnt[0].cnt, 10))
                  .set('lastPage', parseInt(cnt[0].cnt/10+1, 10));
    }
  }),
  [SELECT_PROVINCE]: (state, action) => {
    const { payload: sltProv } = action;
    const sSltProv = state.get('sltProv');
    let select;

    for (var i = 0; i < sSltProv.size; i++) {
      if (sSltProv.get(i) === sltProv) {
        select = i;
        break;
      }
    }

    if (select || select === 0) {
      return state.set('sltProv', fromJS(sSltProv.delete(select)))
    } else {
      return state.set('sltProv', fromJS(sSltProv.push(sltProv)));
    }
  },
  [RESET_PROVINCE]: (state, action) => {
    return state.set('sltProv', List());
  }
}, initialState);
