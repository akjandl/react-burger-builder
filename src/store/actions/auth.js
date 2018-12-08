import * as actn from './actionTypes';

export const authStart = () => {
  return {
    type: actn.AUTH_START
  }
};

export const authSuccess = (authData) => {
  return {
    type: actn.AUTH_SUCCESS,
    authData: authData
  }
};

export const authFailed = (error) => {
  return {
    type: actn.AUTH_FAILED,
    error: error
  }
};

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart());
  }
}