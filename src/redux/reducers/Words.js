import { ADD_WORD, REMOVE_WORD } from "../actions/Words";

const initialState = {
  savedWords: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_WORD:
      const newWords = Array.from(state.savedWords);
      newWords.push(action.word);
      return {
        savedWords: newWords
      };
    case REMOVE_WORD:
      const newWords1 = Array.from(state.savedWords).filter(
        e => e != action.word
      );
      return {
        savedWords: newWords1
      };
    default:
      return state;
  }
};
