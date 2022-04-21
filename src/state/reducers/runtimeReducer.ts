import produce from "immer";
import { Runtime } from "../../types";
import { Action } from "../actions/actionInterfaces";

interface RuntimeInterface {
    runtime: Runtime;
}

const initialState: RuntimeInterface = {
    runtime: "python"
};

const runtimeReducer = produce(
    (state: RuntimeInterface = initialState, action: Action) => {
        return state;
    }
);

export default runtimeReducer;
