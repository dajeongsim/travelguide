import { createAction, handleActions } from 'redux-actions';

import { Map } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';

// action types
const CHANGE_INPUT = 'join/CHANGE_INPUT';
const CHECK_ID_EXISTS = 'join/CHECK_ID_EXISTS'
const CHECK_EMAIL_EXISTS = 'join/CHECK_EMAIL_EXISTS';
const REGISTER = 'join/REGISTER';
const SET_ERROR = 'join/SET_ERROR'

// action creators
export const changeInput = createAction(CHANGE_INPUT);
export const checkIdExists = createAction(CHECK_ID_EXISTS, api.checkIdExists);
export const checkEmailExists = createAction(CHECK_EMAIL_EXISTS, api.checkEmailExists);
export const register = createAction(REGISTER, api.register);
export const setError = createAction(SET_ERROR);

// initial state
const initialState = Map({
  userInfo: Map({
    id: '',
    password: '',
    passwordConfirm: '',
    name: '',
    email: ''
  }),
  exists: Map({
    id: false,
    email: false
  }),
  error: ''
});

// reducer
export default handleActions({
  [CHANGE_INPUT]: (state, action) => {
    const { name, value } = action.payload;

    return state.setIn(['userInfo', name], value);
  },
  ...pender({
    type: CHECK_ID_EXISTS,
    onSuccess: (state, action) => {
      const { data: exists } = action.payload;

      return state.setIn(['exists', 'id'], exists);
    }
  }),
  ...pender({
    type: CHECK_EMAIL_EXISTS,
    onSuccess: (state, action) => {
      const { data: exists } = action.payload;

      return state.setIn(['exists', 'email'], exists);
    }
  }),
  ...pender({
    type: REGISTER,
    onSuccess: (state, action) => initialState
  }),
  [SET_ERROR]: (state, action) => {
    const { payload: error } = action;

    return state.set('error', error);
  }
}, initialState);
