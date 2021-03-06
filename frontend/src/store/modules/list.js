import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';

// action types
const GET_CITY_LIST = 'list/GET_CITY_LIST';
const GET_TAG_LIST = 'list/GET_TAG_LIST';
const GET_POST_LIST = 'list/GET_POST_LIST';
const SELECT_CITY = 'list/SELECT_CITY';
const RESET_CITY = 'list/RESET_CITY';

// action creators
export const getCityList = createAction(GET_CITY_LIST, api.getCityList);
export const getTagList = createAction(GET_TAG_LIST, api.getTagList);
export const getPostList = createAction(GET_POST_LIST, api.getPostList, meta => meta);
export const selectCity = createAction(SELECT_CITY);
export const resetCity = createAction(RESET_CITY);

// initial state
const initialState = Map({
  cities: List(),
  sltCities: List(),
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
      const { rows: cities } = action.payload.data;

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
  [SELECT_CITY]: (state, action) => {
    const { payload: sltCities } = action;
    const sSltCities = state.get('sltCities');
    let select;

    for (var i = 0; i < sSltCities.size; i++) {
      if (sSltCities.get(i) === sltCities) {
        select = i;
        break;
      }
    }

    if (select || select === 0) {
      return state.set('sltCities', fromJS(sSltCities.delete(select)))
    } else {
      return state.set('sltCities', fromJS(sSltCities.push(sltCities)));
    }
  },
  [RESET_CITY]: (state, action) => {
    return state.set('sltCities', List());
  }
}, initialState);
