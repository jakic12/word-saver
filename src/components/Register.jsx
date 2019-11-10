import React, { useState } from "react";

import "../styles/registerForm.scss";

// components
import Card from "./Card";

// router
import { Link } from "react-router-dom";

// firebase
import firebase from "../firebase/firebase";

const Register = ({ loginUrl }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);

  return (
    <div className="registerForm">
      <div className="middleCardWrapper">
        <Card className="middleCard">
          <div className="header">
            <h1>Register</h1>
          </div>
          <form
            onSubmit={e => {
              e.preventDefault();
              setErrorMessage(null);

              if (password === confirmPassword) {
                firebase
                  .auth()
                  .createUserWithEmailAndPassword(email, password)
                  .then(authUser => {
                    console.log(authUser);
                  })
                  .catch(function(error) {
                    console.error(error);
                    setErrorMessage(error.message);
                  });
              } else {
                setErrorMessage(`Password don't match`);
              }
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
              autoComplete={`new-password`}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="confirm password"
              autoComplete={`new-password`}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
            <div className="loginRegisterButtons">
              <input type="submit" value="Register" />
              <Link to={loginUrl} className="login">
                Login
              </Link>
            </div>
          </form>
          {errorMessage && <Card className="errorMessage">{errorMessage}</Card>}
        </Card>
      </div>
    </div>
  );
};

export default Register;
