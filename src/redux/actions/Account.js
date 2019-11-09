export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const USE_ACCOUNT = "USE_ACCOUNT";
export const USE_LOCAL = "USE_LOCAL";

export const loginRequest = () => {
  return { type: LOGIN_REQUEST };
};

export const loginSuccess = userData => {
  return { type: LOGIN_SUCCESS, userData };
};

export const loginFail = error => {
  return { type: LOGIN_FAIL, error };
};

export const setUseAccount = value => {
  return { type: value ? USE_ACCOUNT : USE_LOCAL };
};

export const fetchLogin = (dispatch, user, pass) => {
  dispatch(loginRequest);
  setTimeout(() => {
    if (Math.random() > 0.9) {
      dispatch(loginFail(`This is a test error, please do not fix it`));
    } else {
      dispatch(loginSuccess({ user, pass }));
    }
  }, 2000);
};
