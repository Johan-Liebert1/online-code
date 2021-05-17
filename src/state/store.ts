import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import combinedReducers from "./reducers/combineReducers";

export const store = createStore(combinedReducers, {}, applyMiddleware(thunk));
