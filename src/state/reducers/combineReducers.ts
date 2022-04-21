import { combineReducers } from "redux";
import bundlesReducer from "./bundlesReducer";
import cellsReducer from "./cellReducer";
import runtimeReducer from "./runtimeReducer";

const combinedReducers = combineReducers({
    cells: cellsReducer,
    bundles: bundlesReducer,
    runtime: runtimeReducer
});

export type RootState = ReturnType<typeof combinedReducers>;

export default combinedReducers;
