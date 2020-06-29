import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';

// action types
const INITIALIZE = 'editor/INITIALIZE';
const CHANGE_INPUT = 'editor/CHANGE_INPUT';
const GET_CATEGORY_LIST = 'editor/GET_CATEGORY_LIST';
const WRITE_POST = 'editor/WRITE_POST';
const GET_POST = 'editor/GET_POST';
const EDIT_POST = 'editor/EDIT_POST';

// action creators
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);
export const getCategoryList = createAction(GET_CATEGORY_LIST, api.getCityList);
export const writePost = createAction(WRITE_POST, api.writePost);
export const getPost = createAction(GET_POST);
export const editPost = createAction(EDIT_POST);

// initial state
const initialState = Map({
  title: '',
  categories: List(),
  categories2: List(),
  category: '',
  address: '',
  coords: Map({
    latitude: null,
    longitude: null
  }),
  contents: '',
  tags: '',
  postId: null
});

// reducer
export default handleActions({
  [INITIALIZE]: (state, action) => initialState,
  [CHANGE_INPUT]: (state, action) => {
    const {name, value} = action.payload;

    return state.set(name, value);
  },
  ...pender({
    type: GET_CATEGORY_LIST,
    onSuccess: (state, action) => {
      const { rows: categoryList } = action.payload.data;
      const { type } = action.payload.data;
      console.log(type);

      if (type==='p') {
        return state.set('categories', fromJS(categoryList));
      } else if (type==='c') {
        return state.set('categories2', fromJS(categoryList));
      }
    }
  }),
  ...pender({
    type: WRITE_POST,
    onSuccess: (state, action) => {
      const { insertId } = action.payload.data;
      console.log(insertId);

      return state.set('postId', insertId);
    }
  })
}, initialState);
