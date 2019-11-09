import CacheManager from "../../cache/";

import {
  ADD_WORD,
  REMOVE_WORD,
  WORD_REQUEST,
  WORD_SUCCESS,
  WORD_ERROR,
  REFRESH_STATE
} from "../actions/Words";

const initialState = {
  savedWords: [],
  wordLoading: false,
  error: null,
  wordsShowing: []
};

const cache = new CacheManager();
let newState;

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_WORD:
      const newWords = Array.from(state.savedWords);
      newWords.push(action.word);
      newState = Object.assign({}, state, {
        savedWords: newWords
      });
      cache.writeData("words_state", newState);
      return newState;
    case REMOVE_WORD:
      const newWords1 = Array.from(state.savedWords).filter(
        e => JSON.stringify(e) !== JSON.stringify(action.word)
      );
      newState = Object.assign({}, state, {
        savedWords: newWords1
      });
      cache.writeData("words_state", newState);
      return newState;
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
      newState = Object.assign({}, state, {
        wordLoading: false,
        error: null,
        wordsShowing: Array.from(state.wordsShowing).concat(action.word)
      });
      cache.writeData("words_state", newState);
      return newState;
    case REFRESH_STATE:
      return action.state;
    default:
      return state;
  }
};
