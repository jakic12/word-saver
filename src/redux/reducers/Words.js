import {
  ADD_WORD,
  REMOVE_WORD,
  WORD_REQUEST,
  WORD_SUCCESS,
  WORD_ERROR
} from "../actions/Words";

const initialState = {
  savedWords: [],
  wordLoading: false,
  error: null,
  wordsShowing: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_WORD:
      const newWords = Array.from(state.savedWords);
      newWords.push(action.word);
      return Object.assign({}, state, {
        savedWords: newWords
      });
    case REMOVE_WORD:
      const newWords1 = Array.from(state.savedWords).filter(
        e => e != action.word
      );
      return Object.assign({}, state, {
        savedWords: newWords1
      });
    case WORD_REQUEST:
      return {
        savedWords: Array.from(state.savedWords),
        wordLoading: true,
        error: null,
        wordsShowing: []
      };
    case WORD_ERROR:
      return {
        savedWords: Array.from(state.savedWords),
        wordLoading: false,
        error: action.error,
        wordsShowing: []
      };
    case WORD_SUCCESS:
      return Object.assign({}, state, {
        wordLoading: false,
        error: null,
        wordsShowing: Array.from(state.wordsShowing).concat(action.word)
      });
    default:
      return state;
  }
};
