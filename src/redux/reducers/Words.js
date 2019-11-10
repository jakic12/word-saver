import { WORD_REQUEST, WORD_SUCCESS, WORD_ERROR } from "../actions/Words";

const initialState = {
  wordLoading: false,
  error: null,
  wordsShowing: []
};

let newState;

export default (state = initialState, action) => {
  switch (action.type) {
    case WORD_REQUEST:
      return {
        wordLoading: true,
        error: null,
        wordsShowing: []
      };
    case WORD_ERROR:
      return {
        wordLoading: false,
        error: action.error,
        wordsShowing: []
      };
    case WORD_SUCCESS:
      newState = Object.assign({}, state, {
        wordLoading: false,
        error: null,
        wordsShowing: Array.from(state.wordsShowing).concat(action.word)
      });
      return newState;
    default:
      return state;
  }
};
