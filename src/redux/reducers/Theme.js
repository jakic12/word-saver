import { SET_THEME } from "../actions/Theme";

import CacheManager from "../../cache/";
const cache = new CacheManager();

export default (state = { theme: `light` }, action) => {
  switch (action.type) {
    case SET_THEME:
      cache.writeData("theme", action.theme);
      return { theme: action.theme };
    default:
      return state;
  }
};
