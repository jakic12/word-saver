export const ADD_WORD = "ADD_WORD";
export const REMOVE_WORD = "REMOVE_WORD";
export const WORD_REQUEST = "WORD_REQUEST";
export const WORD_SUCCESS = "WORD_SUCCESS";
export const WORD_ERROR = "WORD_ERROR";

const api_url = word =>
  `https://googledictionaryapi.eu-gb.mybluemix.net/?define=${word}`;

export const addWord = word => {
  return { type: ADD_WORD, word };
};

export const removeWord = word => {
  return { type: REMOVE_WORD, word };
};

export const requestWord = () => {
  return { type: WORD_REQUEST };
};

export const wordRequestError = error => {
  return { type: WORD_ERROR, error };
};

export const wordSuccess = word => {
  return { type: WORD_SUCCESS, word };
};

export const fetchWord = (dispatch, word) => {
  dispatch(requestWord());
  fetch(api_url(word))
    .then(async res => {
      if (!res.ok) throw `Word not found`;
      dispatch(wordSuccess(await res.json()));
    })
    .catch(e => {
      dispatch(wordRequestError(e));
    });
};
