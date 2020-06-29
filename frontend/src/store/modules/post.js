import { createAction, handleActions } from 'redux-actions';

import { Map, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';

// action types
const GET_POST = 'post/GET_POST';
const TOGGLE_LIKE = 'post/TOGGLE_LIKE';
const ON_BLAME = 'post/ON_BLAME';

// action creators
export const getPost = createAction(GET_POST, api.getPost);
export const toggleLike = createAction(TOGGLE_LIKE, api.toggleLike);
export const onBlame = createAction(ON_BLAME, api.onBlame);

// initial state
const initialState = Map({
  post: Map({}),
  likes: null,
  blame: null
});

// reducer
export default handleActions({
  ...pender({
    type: GET_POST,
    onSuccess: (state, action) => {
      const { rows: post } = action.payload.data;
      const { likes, blame } = action.payload.data;

      return state.set('post', fromJS(post[0]))
                  .set('likes', likes[0].likes)
                  .set('blame', blame[0].blame);
    }
  }),
  ...pender({
    type: TOGGLE_LIKE,
    onSuccess: (state, action) => {
      const { like, cnt } = action.payload.data;

      return state.set('likes', like)
                  .updateIn(['post', 'postLikeCnt'], () => cnt[0].cnt);
    }
  }),
  ...pender({
    type: ON_BLAME,
    onSuccess: (state, action) => {
      const { cnt } = action.payload.data;

      return state.set('blame', 1)
                  .updateIn(['post', 'postBlameCnt'], () => cnt[0].cnt);
    }
  })
}, initialState);
