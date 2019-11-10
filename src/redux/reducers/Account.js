import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USE_ACCOUNT,
  USE_LOCAL
} from "../actions/Account";

const initialState = {
  userData: null,
  isLoggingIn: false,
  error: null,
  useAccount: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        userData: null,
        isLoggingIn: true,
        error: null
      });

    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        userData: action.userData,
        isLoggingIn: false,
        error: null
      });

    case LOGIN_FAIL:
      return Object.assign({}, state, {
        userData: null,
        isLoggingIn: false,
        error: action.error
      });

    case USE_ACCOUNT:
      return Object.assign({}, state, {
        useAccount: true
      });

    case USE_LOCAL:
      return Object.assign({}, state, {
        useAccount: false
      });

    default:
      return state;
  }
};
