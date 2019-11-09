export const ADD_WORD = "ADD_WORD";
export const REMOVE_WORD = "REMOVE_WORD";
export const WORD_REQUEST = "WORD_REQUEST";
export const WORD_SUCCESS = "WORD_SUCCESS";
export const WORD_ERROR = "WORD_ERROR";
export const REFRESH_STATE = "REFRESH_STATE";

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

export const refreshState = state => {
  return { type: REFRESH_STATE, state };
};

export const fetchWord = (dispatch, word) => {
  dispatch(requestWord());
  fetch(api_url(word))
    .then(async res => {
      if (!res.ok) throw { message: `Word not found`, userError: true };
      dispatch(wordSuccess(await res.json()));
    })
    .catch(e => {
      console.error(e);
      if (e.userError) dispatch(wordRequestError(e.message));
      else
        dispatch(
          wordRequestError(
            `Internal error, that means something inside isn't working. Try again`
          )
        );
    });
};
