import { combineReducers } from "redux";
import cellsReducer from "./cellReducer";

const combinedReducers = combineReducers({
	cells: cellsReducer
});

export type RootState = ReturnType<typeof combinedReducers>;

export default combinedReducers;
