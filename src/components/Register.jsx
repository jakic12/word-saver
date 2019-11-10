import React from "react";

import "../styles/registerForm.scss";

// components
import Card from "./Card";

// router
import { Link } from "react-router-dom";

const Register = ({ loginUrl }) => {
  return (
    <div className="registerForm">
      <div className="middleCardWrapper">
        <Card className="middleCard">
          <div className="header">
            <h1>Register</h1>
          </div>
          <form>
            <input type="email" placeholder="email" />
            <input type="password" placeholder="password" />
            <input type="password" placeholder="confirm password" />
            <div className="loginRegisterButtons">
              <input type="submit" value="Register" />
              <Link to={loginUrl} className="login">
                Login
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Register;
