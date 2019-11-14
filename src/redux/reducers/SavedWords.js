import CacheManager from "../../cache/";

import {
  ADD_SAVED_WORD_REQUEST,
  ADD_SAVED_WORD_SUCCESS,
  ADD_SAVED_WORD_ERROR,
  REMOVE_SAVED_WORD_REQUEST,
  REMOVE_SAVED_WORD_SUCCESS,
  REMOVE_SAVED_WORD_ERROR,
  SAVED_WORD_REQUEST,
  SAVED_WORD_SUCCESS,
  SAVED_WORD_ERROR,
  REFRESH_STATE,
  HIDE_ERRORS,
  REFRESH_SAVED_WORDS,
  UPDATE_LOCAL_SAVED_WORDS,
  UPDATE_CLOUD_SAVED_WORDS
} from "../actions/SavedWords";

const initialState = {
  savedWords: [],
  savedWordLoading: false,
  error: null,
  addWordLoading: [],
  addWordError: [],
  removeWordLoading: [],
  removeWordError: []
};

const cache = new CacheManager();
let newState;
let tempArrayLoading;
let tempArrayError;

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_SAVED_WORD_REQUEST:
      tempArrayLoading = Array.from(state.addWordLoading);
      tempArrayLoading[action.index] = true;

      tempArrayError = Array.from(state.addWordError);
      tempArrayError[action.index] = undefined;

      return Object.assign({}, state, {
        addWordLoading: tempArrayLoading,
        addWordError: tempArrayError
      });

    case ADD_SAVED_WORD_ERROR:
      tempArrayLoading = Array.from(state.addWordLoading);
      tempArrayLoading[action.index] = undefined;

      tempArrayError = Array.from(state.addWordError);
      tempArrayError[action.index] = action.error;

      return Object.assign({}, state, {
        addWordLoading: tempArrayLoading,
        addWordError: tempArrayError
      });

    case ADD_SAVED_WORD_SUCCESS:
      const newWords = Array.from(state.savedWords);
      if (action.add) newWords.push(action.word);

      tempArrayLoading = Array.from(state.addWordLoading);
      tempArrayLoading[action.index] = undefined;

      tempArrayError = Array.from(state.addWordError);
      tempArrayError[action.index] = undefined;

      newState = Object.assign({}, state, {
        savedWords: newWords,
        addWordLoading: tempArrayLoading,
        addWordError: tempArrayError
      });

      cache.writeData("saved_words_state", newState);
      return newState;

    case REMOVE_SAVED_WORD_REQUEST:
      tempArrayLoading = Array.from(state.removeWordLoading);
      tempArrayLoading[action.index] = true;

      tempArrayError = Array.from(state.removeWordError);
      tempArrayError[action.index] = undefined;

      return Object.assign({}, state, {
        removeWordLoading: tempArrayLoading,
        removeWordError: tempArrayError
      });

    case REMOVE_SAVED_WORD_ERROR:
      tempArrayLoading = Array.from(state.removeWordLoading);
      tempArrayLoading[action.index] = undefined;

      tempArrayError = Array.from(state.removeWordError);
      tempArrayError[action.index] = action.error;

      return Object.assign({}, state, {
        removeWordLoading: tempArrayLoading,
        removeWordError: tempArrayError
      });

    case REMOVE_SAVED_WORD_SUCCESS:
      tempArrayLoading = Array.from(state.removeWordLoading);
      tempArrayLoading[action.index] = undefined;

      tempArrayError = Array.from(state.removeWordError);
      tempArrayError[action.index] = undefined;

      newState = Object.assign({}, state, {
        savedWords: action.remove
          ? Array.from(state.savedWords).filter(
              e => JSON.stringify(e) !== JSON.stringify(action.word)
            )
          : Array.from(state.savedWords),
        removeWordLoading: tempArrayLoading,
        removeWordError: tempArrayError
      });

      cache.writeData("saved_words_state", newState);
      return newState;

    case SAVED_WORD_REQUEST:
      return {
        savedWords: Array.from(state.savedWords),
        savedWordLoading: true,
        error: null
      };
    case SAVED_WORD_ERROR:
      return {
        savedWords: Array.from(state.savedWords),
        savedWordLoading: false,
        error: action.error
      };
    case SAVED_WORD_SUCCESS:
      newState = Object.assign({}, state, {
        savedWordLoading: false,
        error: null
      });
      cache.writeData("saved_words_state", newState);
      return newState;
    case HIDE_ERRORS:
      return Object.assign({}, state, {
        removeWordError: state.removeWordError.filter(
          (e, i) => i != action.index
        ),
        addWordError: state.addWordError.filter((e, i) => i != action.index)
      });
    case REFRESH_STATE:
      return action.state;
    case REFRESH_SAVED_WORDS:
      return Object.assign({}, state, {
        savedWords: Array.from(action.savedWords)
      });
    case UPDATE_LOCAL_SAVED_WORDS:
      newState = Object.assign({}, state, {
        savedWords: Array.from(action.savedWords)
      });
      cache.writeData("saved_words_state", newState);
      return Object.assign({}, state, {
        savedWords: Array.from(action.savedWords)
      });
    case UPDATE_CLOUD_SAVED_WORDS:
      return Object.assign({}, state, {
        savedWords: Array.from(action.savedWords)
      });
    default:
      return state;
  }
};
