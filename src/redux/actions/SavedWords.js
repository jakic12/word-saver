export const ADD_SAVED_WORD = "ADD_SAVED_WORD";
export const REMOVE_SAVED_WORD = "REMOVE_SAVED_WORD";
export const SAVED_WORD_REQUEST = "SAVED_WORD_REQUEST";
export const SAVED_WORD_SUCCESS = "SAVED_WORD_SUCCESS";
export const SAVED_WORD_ERROR = "SAVED_WORD_ERROR";
export const REFRESH_STATE = "SAVED_WORD_REFRESH_STATE";

const api_url = word =>
  `https://googledictionaryapi.eu-gb.mybluemix.net/?define=${word}`;

export const addWord = word => {
  return { type: ADD_SAVED_WORD, word };
};

export const removeWord = word => {
  return { type: REMOVE_SAVED_WORD, word };
};

export const requestWord = () => {
  return { type: SAVED_WORD_REQUEST };
};

export const wordSuccess = word => {
  return { type: SAVED_WORD_SUCCESS, word };
};

export const wordRequestError = error => {
  return { type: SAVED_WORD_ERROR, error };
};

export const refreshState = state => {
  return { type: REFRESH_STATE, state };
};

export const fetchSavedWords = (dispatch, word) => {
  //dispatch(requestWord());
};
