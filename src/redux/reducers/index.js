//import redux
import { combineReducers } from "redux";

//import reducers
import Account from "./Account";
import Words from "./Words";
import SavedWords from "./SavedWords";
import Theme from "./Theme";

export default combineReducers({
  account: Account,
  words: Words,
  savedWords: SavedWords,
  theme: Theme
});
