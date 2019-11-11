import React from "react";

import "../styles/accountSettings.scss";

// components
import Card from "../components/Card";

// firebase
import firebase from "../firebase/firebase";

const AccountSettings = ({ userData, setUseAccountCallback }) => {
  const createdAt = new Date(userData.metadata.creationTime);
  return (
    <div className="accountSettings">
      {userData && (
        <Card>
          <div className="cardHeader">
            <div className="cardField email">
              <div>{userData.email}</div>
            </div>
            <div className="cardField logout">
              <button onClick={() => firebase.auth().signOut()}>log out</button>
            </div>
          </div>
        </Card>
      )}
      {!userData && (
        <Card onClick={() => setUseAccountCallback()}>
          <div className="setUseAccount">Use account</div>
        </Card>
      )}
    </div>
  );
};

export default AccountSettings;
