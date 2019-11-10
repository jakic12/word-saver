import CacheManager from "../../cache/";

import {
  ADD_SAVED_WORD,
  REMOVE_SAVED_WORD,
  SAVED_WORD_REQUEST,
  SAVED_WORD_SUCCESS,
  SAVED_WORD_ERROR,
  REFRESH_STATE
} from "../actions/SavedWords";

const initialState = {
  savedWords: [],
  savedWordLoading: false,
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
        savedWordLoading: true,
        error: null
      };
    case WORD_ERROR:
      return {
        savedWords: Array.from(state.savedWords),
        savedWordLoading: false,
        error: action.error
      };
    case WORD_SUCCESS:
      newState = Object.assign({}, state, {
        savedWordLoading: false,
        error: null
      });
      cache.writeData("words_state", newState);
      return newState;
    case REFRESH_STATE:
      return action.state;
    default:
      return state;
  }
};
