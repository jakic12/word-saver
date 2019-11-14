import firebase from "../../firebase/firebase";
import { deepEquals } from "../../utils";

export const ADD_SAVED_WORD_REQUEST = "ADD_SAVED_WORD_REQUEST";
export const ADD_SAVED_WORD_SUCCESS = "ADD_SAVED_WORD_SUCCESS";
export const ADD_SAVED_WORD_ERROR = "ADD_SAVED_WORD_ERROR";

export const REMOVE_SAVED_WORD_REQUEST = "REMOVE_SAVED_WORD";
export const REMOVE_SAVED_WORD_SUCCESS = "REMOVE_SAVED_SUCCESS";
export const REMOVE_SAVED_WORD_ERROR = "REMOVE_SAVED_ERROR";

export const SAVED_WORD_REQUEST = "SAVED_WORD_REQUEST";
export const SAVED_WORD_SUCCESS = "SAVED_WORD_SUCCESS";
export const SAVED_WORD_ERROR = "SAVED_WORD_ERROR";

export const REFRESH_STATE = "SAVED_WORD_REFRESH_STATE";
export const REFRESH_SAVED_WORDS = "REFRESH_SAVED_WORDS";
export const HIDE_ERRORS = "HIDE_ERRORS";

export const UPDATE_LOCAL_SAVED_WORDS = "UPDATE_LOCAL_SAVED_WORDS";
export const UPDATE_CLOUD_SAVED_WORDS = "UPDATE_CLOUD_SAVED_WORDS";

export const addSavedWordRequest = index => {
  return { type: ADD_SAVED_WORD_REQUEST, index };
};

export const hideError = index => {
  return { type: HIDE_ERRORS, index };
};

export const addSavedWordError = (error, index) => {
  return { type: ADD_SAVED_WORD_ERROR, error, index };
};

export const addSavedWordSuccess = (word, index, add = true) => {
  return { type: ADD_SAVED_WORD_SUCCESS, word, index, add };
};

export const addSavedWord = (dispatch, word, index, local) => {
  dispatch(addSavedWordRequest(index));
  if (local) {
    dispatch(addSavedWordSuccess(word, index));
  } else {
    firebase
      .database()
      .ref("user-saves/" + firebase.auth().currentUser.uid)
      .push()
      .set(word)
      .then(res => {
        dispatch(addSavedWordSuccess(word, index, false));
      })
      .catch(e => {
        console.log(e);
        console.log(Object.keys(e));
        dispatch(addSavedWordError(e.code || e.message || e, index));
      });
  }
};

export const requestSavedWord = () => {
  return { type: SAVED_WORD_REQUEST };
};

export const wordSavedSuccess = word => {
  return { type: SAVED_WORD_SUCCESS, word };
};

export const wordSavedRequestError = error => {
  return { type: SAVED_WORD_ERROR, error };
};

export const fetchSavedWords = (dispatch, word) => {
  //dispatch(requestWord());
};

export const removeSavedWordRequest = index => {
  return { type: REMOVE_SAVED_WORD_REQUEST, index };
};

export const removeSavedWordError = (error, index) => {
  return { type: REMOVE_SAVED_WORD_SUCCESS, error, index };
};

export const removeSavedWordSuccess = (word, index, remove = true) => {
  return { type: REMOVE_SAVED_WORD_SUCCESS, word, index, remove };
};

export const removeSavedWord = (dispatch, word, index, local) => {
  dispatch(removeSavedWordRequest(index));
  if (local) {
    dispatch(removeSavedWordSuccess(word, index));
  } else {
    if (word.uid) {
      firebase
        .database()
        .ref("user-saves/" + firebase.auth().currentUser.uid)
        .child(word.uid)
        .remove()
        .then(() => {
          dispatch(removeSavedWordSuccess(word, index, false));
        })
        .catch(e => {
          console.log(e);
          dispatch(removeSavedWordError(e.code || e.message || e, index));
        });
    } else {
      firebase // find words in cloud
        .database()
        .ref("user-saves/" + firebase.auth().currentUser.uid)
        .on(
          "value",
          snapshot => {
            const out = snapshot.val();
            if (out) {
              let ignoreOthers = false;
              Object.keys(out)
                .map(k => {
                  out[k].uid = k;
                  return out[k];
                }) // convert them
                .forEach(wordInCloud => {
                  if (!ignoreOthers) {
                    const uid = wordInCloud.uid;
                    delete wordInCloud.uid;
                    if (deepEquals(word, wordInCloud)) {
                      ignoreOthers = true;
                      // find if the word is in the cloud
                      firebase // delete it
                        .database()
                        .ref("user-saves/" + firebase.auth().currentUser.uid)
                        .child(uid)
                        .remove()
                        .then(() => {
                          dispatch(removeSavedWordSuccess(word, index, false));
                        })
                        .catch(e => {
                          console.log(e);
                          dispatch(
                            removeSavedWordError(
                              e.code || e.message || e,
                              index
                            )
                          );
                        });
                    }
                  }
                });
            }
          },
          errorObject => {
            console.log(
              `At Removal: firebase read from database failed`,
              errorObject
            );
          }
        );
    }
  }
};

export const updateLocallySavedWords = savedWords => {
  return { type: UPDATE_LOCAL_SAVED_WORDS, savedWords };
};

export const updateCloudSavedWords = savedWords => {
  console.log(savedWords);
  firebase
    .database()
    .ref("user-saves/" + firebase.auth().currentUser.uid)
    .set(savedWords);
};

export const refreshState = state => {
  return { type: REFRESH_STATE, state };
};

export const refreshSavedWords = savedWords => {
  return { type: REFRESH_SAVED_WORDS, savedWords };
};
