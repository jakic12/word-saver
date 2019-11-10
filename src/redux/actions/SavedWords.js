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

const addWordApi = word => ``;

const removeWordApi = word => ``;

const fetchWordsApi = word => ``;

export const addSavedWordRequest = index => {
  return { type: ADD_SAVED_WORD_REQUEST, index };
};

export const addSavedWordError = (error, index) => {
  return { type: ADD_SAVED_WORD_SUCCESS, error, index };
};

export const addSavedWordSuccess = (word, index) => {
  return { type: ADD_SAVED_WORD_SUCCESS, word, index };
};

export const addSavedWord = (dispatch, word, index, local) => {
  dispatch(addSavedWordRequest(index));
  if (local) {
    dispatch(addSavedWordSuccess(word, index));
  } else {
    fetch(addWordApi(word))
      .then(res => {
        if (!res.ok) throw new Error(`api not ok`);
        dispatch(addSavedWordSuccess(word, index));
      })
      .catch(e => {
        console.log(e);
        dispatch(addSavedWordError(e.message, index));
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

export const removeSavedWordSuccess = (word, index) => {
  return { type: REMOVE_SAVED_WORD_SUCCESS, word, index };
};

export const removeSavedWord = (dispatch, word, index, local) => {
  dispatch(removeSavedWordRequest(index));
  if (local) {
    dispatch(removeSavedWordSuccess(word, index));
  } else {
    fetch(addWordApi(word))
      .then(res => {
        if (!res.ok) throw new Error(`api not ok`);
        dispatch(removeSavedWordSuccess(word, index));
      })
      .catch(e => {
        console.log(e);
        dispatch(removeSavedWordError(e.message, index));
      });
  }
};

export const refreshState = state => {
  return { type: REFRESH_STATE, state };
};
