import React, { useState, useEffect } from "react";

import "../styles/mainApp.scss";

// redux
import { connect } from "react-redux";
import { fetchWord } from "../redux/actions/Words";
import { setUseAccount } from "../redux/actions/Account";

import {
  addSavedWord,
  removeSavedWord,
  refreshState as refreshSavedWordsState,
  hideError,
  refreshSavedWords,
  updateLocallySavedWords,
  updateCloudSavedWords
} from "../redux/actions/SavedWords";

// local storage
import CacheManager from "../cache";

// router
import { Redirect } from "react-router-dom";

// components
import Card from "../components/Card";
import WordsDisplay from "../components/WordsDisplay";
import AccountSettings from "./AccountSettings";

//firebase
import firebase from "../firebase/firebase";

const cache = new CacheManager();

const tabs = [
  {
    label: `Search`,
    render: props => (
      <WordsWithSearch
        getWord={props.getWord}
        addWord={props.addWord}
        removeWord={props.removeWord}
        status={props.words}
        savedWordsStatus={props.savedWords}
        savedWords={props.savedWords.savedWords}
        wordsToDisplay={props.words.wordsShowing}
        local={!props.account.useAccount}
        hideWordError={props.hideWordError}
      />
    )
  },
  {
    label: `Saved Words`,
    render: props => (
      <WordsDisplay
        getWord={props.getWord}
        addWord={props.addWord}
        removeWord={props.removeWord}
        status={props.savedWords}
        savedWordsStatus={props.savedWords}
        savedWords={props.savedWords.savedWords}
        wordsToDisplay={props.savedWords.savedWords}
        local={!props.account.useAccount}
        hideWordError={props.hideWordError}
      />
    )
  },
  {
    label: `Account`,
    render: props => (
      <AccountSettings
        userData={props.account.userData}
        setUseAccountCallback={props.useAccount}
        getCloudSavedWords={() =>
          new Promise((resolve, reject) => {
            if (firebase.auth().currentUser) {
              firebase
                .database()
                .ref("user-saves/" + firebase.auth().currentUser.uid)
                .once("value", snapshot => {
                  const out = snapshot.val();
                  if (out) {
                    const array = Object.keys(out).map(k => {
                      out[k].uid = k;
                      return out[k];
                    });
                    console.log(out, array);
                    resolve(array);
                  }
                  resolve([]);
                });
            }
          })
        }
        getLocalSavedWords={() => {
          return cache.readData(`saved_words_state`).then(
            data =>
              new Promise((resolve, reject) => {
                resolve(data.savedWords);
              })
          );
        }}
        copyLocalToCloud={() => {
          cache.readData(`saved_words_state`).then(saved_words_state => {
            if (saved_words_state.savedWords) {
              props.localToCloud(saved_words_state.savedWords);
            }
          });
        }}
        copyCloudToLocal={() => {
          firebase
            .database()
            .ref("user-saves/" + firebase.auth().currentUser.uid)
            .once(
              "value",
              snapshot => {
                const out = snapshot.val();
                if (out) {
                  props.cloudToLocal(
                    Object.keys(out).map(k => {
                      out[k].uid = k;
                      return out[k];
                    })
                  );
                }
              },
              errorObject => {
                console.log(`firebase read from database failed`, errorObject);
              }
            );
        }}
      />
    )
  }
];

const MainApp = props => {
  const { account, words, savedWords, refreshSavedWordsState } = props;
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    if (account.useAccount) {
      firebase
        .database()
        .ref("user-saves/" + firebase.auth().currentUser.uid)
        .on(
          "value",
          snapshot => {
            const out = snapshot.val();
            if (out) {
              props.refreshSavedWords(
                Object.keys(out).map(k => {
                  out[k].uid = k;
                  return out[k];
                })
              );
            } else {
              props.refreshSavedWords([]);
            }
          },
          errorObject => {
            console.log(`firebase read from database failed`, errorObject);
          }
        );
    } else {
      cache.readData(`saved_words_state`).then(saved_words_state => {
        if (!saved_words_state) {
          cache.writeData(`saved_words_state`, savedWords);
          return;
        } else {
          refreshSavedWordsState(saved_words_state);
        }
      });
    }
  }, []);

  if (
    (!account.userData && account.useAccount) ||
    account.useAccount === null
  ) {
    return <Redirect to={`/login`} />;
  }

  return (
    <div className="mainApp">
      <div className="mainAppBody">{tabs[selectedTab].render(props)}</div>
      <div className="bottomBar">
        {tabs.map((tab, i) => (
          <div
            className={`tab${selectedTab == i ? ` selected` : ``}`}
            onClick={() => setSelectedTab(i)}
            key={`tab_button_${i}`}
          >
            {tab.label}
          </div>
        ))}
      </div>
    </div>
  );
};

const WordsWithSearch = props => {
  const { getWord } = props;
  const [wordInput, setWordInput] = useState("");

  return (
    <>
      <div className="topSearch">
        <Card>
          <form
            onSubmit={e => {
              e.preventDefault();
              getWord(wordInput);
              //addWord(wordInput);
              setWordInput("");
            }}
          >
            <input
              type="text"
              value={wordInput}
              onChange={e => setWordInput(e.target.value)}
            />
          </form>
        </Card>
      </div>
      <WordsDisplay {...props} />
    </>
  );
};

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    addWord: (word, index, local) => addSavedWord(dispatch, word, index, local),
    removeWord: (word, index, local) => {
      removeSavedWord(dispatch, word, index, local);
    },
    getWord: word => fetchWord(dispatch, word),
    refreshSavedWordsState: state => dispatch(refreshSavedWordsState(state)),
    useAccount: () => dispatch(setUseAccount(true)),
    hideWordError: index => {
      dispatch(hideError(index));
    },
    refreshSavedWords: savedWords => {
      dispatch(refreshSavedWords(savedWords));
    },
    localToCloud: savedWords => {
      updateCloudSavedWords(savedWords);
    },
    cloudToLocal: savedWords => {
      dispatch(updateLocallySavedWords(savedWords));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);
