import { createAction, handleActions } from 'redux-actions';

import { Map } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';

// action types
const SHOW_MODAL = 'base/SHOW_MODAL';
const HIDE_MODAL = 'base/HIDE_MODAL';
const LOGIN = 'base/LOGIN';
const N_LOGIN = 'base/N_LOGIN';
const G_LOGIN = 'base/G_LOGIN';
const K_LOGIN = 'base/K_LOGIN';
const LOGOUT = 'base/LOGOUT';
const CHANGE_USER_INPUT = 'base/CHANGE_USER_INPUT';
const CHECK_INPUT_VALID = 'base/CHECK_INPUT_VALID';
const INITIALIZE_LOGIN_MODAL = 'base/INITIALIZE_LOGIN_MODAL';
const CHECK_LOGIN_STATUS = 'base/CHECK_LOGIN_STATUS';
const SET_LOGGED_INFO = 'base/SET_LOGGED_INFO';

// action creators
export const showModal = createAction(SHOW_MODAL);
export const hideModal = createAction(HIDE_MODAL);
export const login = createAction(LOGIN, api.login);
export const nLogin = createAction(N_LOGIN);
export const gLogin = createAction(G_LOGIN);
export const kLogin = createAction(K_LOGIN);
export const logout = createAction(LOGOUT, api.logout);
export const changeUserInput = createAction(CHANGE_USER_INPUT);
export const checkInputValid = createAction(CHECK_INPUT_VALID);
export const initializeLoginModal = createAction(INITIALIZE_LOGIN_MODAL);
export const checkLoginStatus = createAction(CHECK_LOGIN_STATUS, api.checkLogin);
export const setLoggedInfo = createAction(SET_LOGGED_INFO);

// initial state
const initialState = Map({
  // 모달의 가시성 상태
  modal: Map({
    remove: false,
    login: false
  }),
  // 로그인 모달 상태
  loginModal: Map({
    id: '',
    password: '',
    valid: false,
    error: false
  }),
  // 로그인한 유저 정보
  loggedInfo: Map({
    userId: '',
    userMemId: '',
    valid: false
  }),
  logged: false // 현재 로그인 상태
});

// reducer
export default handleActions({
  [SHOW_MODAL]: (state, action) => {
    const { payload: modalName } = action;

    return state.setIn(['modal', modalName], true);
  },
  [HIDE_MODAL]: (state, action) => {
    const { payload: modalName } = action;

    return state.setIn(['modal', modalName], false);
  },
  ...pender({
    type: LOGIN,
    onSuccess: (state, action) => {
      const { userId, userMemId } = action.payload.data;

      return state.set('logged', true)
                  .setIn(['loggedInfo', 'userId'], userId)
                  .setIn(['loggedInfo', 'userMemId'], userMemId)
                  .setIn(['loggedInfo', 'valid'], true);
    },
    onError: (state, action) => {
      const { error } = action.payload.response.data;

      return state.setIn(['loginModal', 'error'], error);
    }
  }),
  ...pender({
    type: N_LOGIN,
    onSuccess: (state, action) => {
      return ;
    }
  }),
  ...pender({
    type: G_LOGIN,
    onSuccess: (state, action) => {
      return ;
    }
  }),
  ...pender({
    type: K_LOGIN,
    onSuccess: (state, action) => {
      return ;
    }
  }),
  [CHANGE_USER_INPUT]: (state, action) => {
    const { name, value } = action.payload;

    return state.setIn(['loginModal', name], value);
  },
  [CHECK_INPUT_VALID]: (state, action) => {
    const { id, password } = action.payload;

    if (!id) {
      return state.setIn(['loginModal', 'error'], 3)
                  .setIn(['loginModal', 'valid'], false);
    } else if (!password) {
      return state.setIn(['loginModal', 'error'], 4)
                  .setIn(['loginModal', 'valid'], false);
    } else if (id && password) {
      return state.setIn(['loginModal', 'valid'], true);
    }
  },
  [INITIALIZE_LOGIN_MODAL]: (state, action) => {
    return state.set('loginModal', initialState.get('loginModal'));
  },
  ...pender({
    type: CHECK_LOGIN_STATUS,
    onSuccess: (state, action) => {
      if(action.payload.data) {
        const { userId, userMemId } = action.payload.data;

        return state.setIn(['loggedInfo', 'userId'], userId)
                    .setIn(['loggedInfo', 'userMemId'], userMemId)
                    .setIn(['loggedInfo', 'valid'], true);
      }
    },
    onFailure: (state, action) => initialState
  }),
  [SET_LOGGED_INFO]: (state, action) => {
    const { userId, userMemId } = action.payload;

    return state.set('logged', true)
                .setIn(['loggedInfo', 'userId'], userId)
                .setIn(['loggedInfo', 'userMemId'], userMemId);
  }
}, initialState);
