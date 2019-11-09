export const ADD_WORD = "ADD_WORD";
export const REMOVE_WORD = "REMOVE_WORD";

export const addWord = word => {
  return { type: ADD_WORD, word };
};
export const removeWord = word => {
  return { type: REMOVE_WORD, word };
};
