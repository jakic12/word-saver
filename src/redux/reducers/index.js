//import redux
import { combineReducers } from "redux";

//import reducers
import Account from "./Account";
import Words from "./Words";

export default combineReducers({
  account: Account,
  words: Words
});
