import React from "react";

import "../styles/loginForm.scss";

// components
import Card from "./Card";

// router
import { Link } from "react-router-dom";

const LoginForm = ({ registerUrl }) => {
  return (
    <div className="loginForm">
      <div className="middleCardWrapper">
        <Card className="middleCard">
          <div className="header">
            <h1>Login</h1>
          </div>
          <form>
            <input type="email" placeholder="email" />
            <input type="password" placeholder="password" />
            <div className="loginRegisterButtons">
              <input type="submit" value="Login" />
              <Link to={registerUrl} className="register">
                Register
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
