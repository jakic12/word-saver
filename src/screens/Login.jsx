import React from "react";

import "../styles/login.scss";

// redux
import { connect } from "react-redux";
import {
  fetchLogin,
  setUseAccount,
  setUser,
  logOut
} from "../redux/actions/Account";

// router
import { Redirect, Route } from "react-router-dom";

// components
import LoginForm from "../components/LoginForm";
import Register from "../components/Register";
import PasswordReset from "../components/PasswordReset";

// firebase
import firebase from "../firebase/firebase";

const Login = ({
  useAccount,
  setUseAccount,
  error,
  login,
  userData,
  setUser,
  isLoggingIn,
  logOutUser
}) => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      setUser(user);
    } else {
      logOutUser();
    }
  });
  return (
    <div className="login">
      {useAccount === null && (
        <SelectUseAccount setAccountCallback={setUseAccount} />
      )}

      {useAccount !== null && !useAccount && <Redirect to={"/app"} />}
      {useAccount !== null && useAccount && (
        <div style={{ height: `100%`, width: `100%` }}>
          {!userData && (
            <>
              <Route
                path={`/login`}
                exact={true}
                render={props => (
                  <LoginForm
                    {...props}
                    registerUrl={`/login/register`}
                    loginCallback={login}
                    error={error}
                    isLoggingIn={isLoggingIn}
                  />
                )}
              />
              <Route
                path={`/login/register`}
                render={props => <Register {...props} loginUrl={`/login`} />}
              />
              <Route path={`/login/passwordReset`} component={PasswordReset} />
            </>
          )}
          {userData && <Redirect to={"/app"} />}
        </div>
      )}
    </div>
  );
};

const SelectUseAccount = ({ setAccountCallback }) => {
  return (
    <div className="useAccountSelection">
      <div
        className="selectionType local"
        onClick={() => setAccountCallback(false)}
      >
        <div className="wrapper">
          <h1>Local storage</h1>
          <h5>All of your words will be stored on your phone</h5>
        </div>
      </div>
      <div
        className="selectionType account"
        onClick={() => setAccountCallback(true)}
      >
        <div className="wrapper">
          <h1>Cloud storage</h1>
          <h5>All of your words will be stored in the cloud</h5>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return state.account;
};

const mapDispatchToProps = dispatch => {
  return {
    login: (user, pass) => {
      fetchLogin(dispatch, user, pass);
    },
    setUseAccount: value => {
      dispatch(setUseAccount(value));
    },
    setUser: userData => {
      dispatch(setUser(userData));
    },
    logOutUser: () => {
      dispatch(logOut());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
