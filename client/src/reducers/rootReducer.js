import { combineReducers } from "redux";
import authentication from "./authentication";
import todoreducer from "./todoreducer";

export default combineReducers({
  auth: authentication,
  todos: todoreducer,
});
