import axios from 'axios';

import * as actn from './actionTypes';

export const authStart = () => {
  return {
    type: actn.AUTH_START
  }
};

export const authSuccess = (token, userId) => {
  return {
    type: actn.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  }
};

export const authFailed = (error) => {
  return {
    type: actn.AUTH_FAILED,
    error: error
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('authExpirationDatetime');
  localStorage.removeItem('userId');
  return {
    type: actn.AUTH_LOGOUT
  }
};

export const checkAuthTimeout = (expirationTime) => {
  // expiration time in seconds
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000)
  }
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyALQetO_TBE58dFfadrfaOnAUOYgk4nRok';
    if (!isSignup) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyALQetO_TBE58dFfadrfaOnAUOYgk4nRok';
    }
    axios.post(url, authData)
      .then(response => {
        console.log(response);
        const expirationDatetime = new Date(
          new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('authExpirationDatetime', expirationDatetime);
        localStorage.setItem('userId', response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn))
      })
      .catch((error) => {
        console.log(error);
        dispatch(authFailed(error.response.data.error))
      });
  }
};

export const setAuthRedirectPath = path => {
  return {
    type: actn.SET_AUTH_REDIRECT_PATH,
    redirectPath: path
  }
};

export const authCheckLoginState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const authExpirationDatetime = new Date(
        localStorage.getItem('authExpirationDatetime'));
      if (authExpirationDatetime > new Date()) {
        const timeToTimeout = (
          authExpirationDatetime.getTime() - new Date().getTime()) / 1000;
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout(timeToTimeout));
      } else {
        logout();
      }
    }
  }
};