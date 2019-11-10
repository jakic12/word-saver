import React, { useState } from "react";

import "../styles/loginForm.scss";

// components
import Card from "./Card";
import { Default } from "react-awesome-spinners";

// router
import { Link } from "react-router-dom";

const LoginForm = ({ registerUrl, loginCallback, error, isLoggingIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);
  return (
    <div className="loginForm">
      <div className="middleCardWrapper">
        <Card className="middleCard">
          <div className="header">
            <h1>Login {isLoggingIn && <Default />}</h1>
          </div>
          <form
            onSubmit={e => {
              e.preventDefault();
              setErrorMessage(null);

              loginCallback(email, password);
            }}
          >
            <input
              type="email"
              placeholder="email"
              autoComplete={`username`}
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="password"
              autoComplete={`current-password`}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <div className="loginRegisterButtons">
              <input type="submit" value="Login" />
              <Link to={registerUrl} className="register">
                Register
              </Link>
            </div>
          </form>
          {(errorMessage || error) && (
            <Card className="errorMessage">{error || errorMessage}</Card>
          )}
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
