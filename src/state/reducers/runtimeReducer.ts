import produce from "immer";
import { Runtime } from "../../types";
import { Action } from "../actions/actionInterfaces";
import { ActionType } from "../actionTypes/actionTypes";

interface RuntimeInterface {
    runtime: Runtime;
}

const initialState: RuntimeInterface = {
    runtime: "python",
};

const runtimeReducer = produce(
    (state: RuntimeInterface = initialState, action: Action) => {
        switch (action.type) {
            case ActionType.CHANGE_RUNTIME:
                const { payload } = action;
                return { ...state, runtime: payload.runtime };

            default:
                return state;
        }
    }
);

export default runtimeReducer;
