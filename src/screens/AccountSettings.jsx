import React, { useEffect, useState } from "react";

import "../styles/accountSettings.scss";

// components
import Card from "../components/Card";

// firebase
import firebase from "../firebase/firebase";

const AccountSettings = ({
  userData,
  setUseAccountCallback,
  getCloudSavedWords,
  getLocalSavedWords,
  copyLocalToCloud,
  copyCloudToLocal,
  themes,
  selectedTheme,
  setThemeCallback
}) => {
  const [cloudSavedWords, setCloudSavedWords] = useState(
    getCloudSavedWords ? "loading" : false
  );
  const [localSavedWords, setLocalSavedWords] = useState(
    getLocalSavedWords ? "loading" : false
  );

  useEffect(() => {
    getCloudSavedWords()
      .then(words => {
        setCloudSavedWords(words);
      })
      .catch(e => {
        console.log(e);
        setCloudSavedWords("error");
      });

    getLocalSavedWords()
      .then(words => {
        setLocalSavedWords(words);
      })
      .catch(e => {
        console.log(e);
        setLocalSavedWords("error");
      });
  }, []);
  return (
    <div className="accountSettings">
      {userData && (
        <Card className="card">
          <div className="cardHeader">
            <div className="cardField email">
              <div>{userData.email}</div>
            </div>
            <div className="cardField logout">
              <button onClick={() => firebase.auth().signOut()}>log out</button>
            </div>
          </div>
          {cloudSavedWords &&
            localSavedWords &&
            Array.isArray(cloudSavedWords) &&
            Array.isArray(localSavedWords) && (
              <>
                <div className="cardBodyField">
                  <h1>Data</h1>
                  <div className="data">
                    <div className="local">
                      <div className="localHeader">Saved locally:</div>
                      {localSavedWords.map((word, word_i) => (
                        <div key={`local_${word_i}`} className="word">
                          {word.word}
                        </div>
                      ))}
                    </div>
                    <div className="cloud">
                      <div className="cloudHeader">Saved on the cloud:</div>
                      {cloudSavedWords.map((word, word_i) => (
                        <div key={`cloud_${word_i}`} className="word">
                          {word.word}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="dataManipulationButtons">
                    <button
                      onClick={() => {
                        if (copyLocalToCloud) copyLocalToCloud();
                      }}
                    >
                      copy local to cloud
                    </button>
                    <button
                      onClick={() => {
                        if (copyCloudToLocal) copyCloudToLocal();
                      }}
                    >
                      copy cloud to local
                    </button>
                  </div>
                </div>
                <div className="cardBodyField">
                  <h1>Theme</h1>
                  <div className="themeSelect">
                    <select
                      onChange={e => setThemeCallback(e.target.value)}
                      value={selectedTheme}
                    >
                      {themes.map((theme, i) => (
                        <option
                          value={theme.value}
                          key={`theme_select_option_${i}`}
                        >
                          {theme.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}
          {(cloudSavedWords === "loading" || localSavedWords === "loading") && (
            <div>loading</div>
          )}
          {cloudSavedWords === "error" && (
            <div>Error loading words from the cloud</div>
          )}
          {localSavedWords === "error" && (
            <div>Error loading words from local storage</div>
          )}
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
