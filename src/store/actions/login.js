import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  GET_ACCOUNT_INFO
} from './actionstype.js';

export const loginRequest = (data) => {
  return { type: LOGIN_REQUEST, payload: data };
};

export const loginSuccess = (id_token) => {
  return { type: LOGIN_SUCCESS, payload: { id_token } };
};

export const loginFailure = (data) => {
  return { type: LOGIN_FAILURE, payload: { status: data.status, msg: data.msg } };
};

export const logoutRequest = () => {
  return { type: LOGOUT_REQUEST };
};

export const getAccountInfoData = (data) => {
  return { type: GET_ACCOUNT_INFO, payload: data };
};

