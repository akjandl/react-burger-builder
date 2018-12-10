import * as actn from '../actions/actionTypes';
import { updateObject} from "../utility";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: null,
  authRedirect: '/',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case actn.AUTH_START:
      return updateObject(state, {error: false, loading: true});

    case actn.AUTH_LOGOUT:
      return updateObject(state, {userId: null, token: null});

    case actn.AUTH_SUCCESS:
      return updateObject(state, {
        loading: false,
        error: false,
        token: action.idToken,
        userId: action.userId
      });

    case actn.AUTH_FAILED:
      return updateObject(state, {
        loading: false,
        error: action.error
      });

    case actn.SET_AUTH_REDIRECT_PATH:
      return updateObject(state, {authRedirect: action.redirectPath});

    default:
      return state;
  }
};

export default reducer;