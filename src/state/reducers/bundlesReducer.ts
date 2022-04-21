import produce from "immer";
import { Action } from "../actions/actionInterfaces";
import { ActionType } from "../actionTypes/actionTypes";

interface BundleState {
    [key: string]:
        | {
              loading: boolean;
              code: string;
              error: string;
              stdout: string;
              stderr: string;
          }
        | undefined;
}

const initialState: BundleState = {};

const bundlesReducer = produce(
    (state: BundleState = initialState, action: Action): BundleState => {
        switch (action.type) {
            case ActionType.BUNDLE_START: {
                state[action.payload.cellId] = {
                    loading: true,
                    code: "",
                    error: "",
                    stdout: "",
                    stderr: ""
                };
                return state;
            }

            case ActionType.BUNDLE_COMPLETE: {
                state[action.payload.cellId] = {
                    loading: false,
                    code: action.payload.bundle.code,
                    error: action.payload.bundle.error,
                    stdout: action.payload.stdout,
                    stderr: action.payload.stderr
                };
                return state;
            }

            default:
                return state;
        }
    }
);

export default bundlesReducer;
