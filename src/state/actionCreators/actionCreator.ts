import { Dispatch } from "redux";
import bundler from "../../bundler";
import { Runtime } from "../../types";
import {
    DeleteCellAction,
    InserCellAfterAction,
    MoveCellAction,
    UpdateCellAction,
    Direction,
    Action
} from "../actions/actionInterfaces";
import { ActionType } from "../actionTypes/actionTypes";
import { CellTypes } from "../cellInterface";

export const updateCell = (id: string, content: string): UpdateCellAction => {
    return {
        type: ActionType.UPDATE_CELL,
        payload: { id, content }
    };
};

export const deleteCell = (id: string): DeleteCellAction => {
    return {
        type: ActionType.DELETE_CELL,
        payload: id
    };
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
    return {
        type: ActionType.MOVE_CELL,
        payload: { id, direction }
    };
};

export const insertCellAfter = (
    id: string | null,
    type: CellTypes
): InserCellAfterAction => {
    return {
        type: ActionType.INSERT_CELL_AFTER,
        payload: { id, type }
    };
};

export const createBundle =
    (cellId: string, codeInput: string, runtime: Runtime = "javascript") =>
    async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.BUNDLE_START,
            payload: {
                cellId
            }
        });

        let result = {
            code: "",
            error: ""
        };

        let stdout = "";
        let stderr = "";

        if (runtime === "javascript") {
            result = await bundler(codeInput);
        } else {
            const resp = await fetch("http://localhost:5000/", {
                method: "POST",
                body: JSON.stringify({ code: codeInput })
            });

            const d = await resp.json();

            stdout = d.stdout;
            stderr = d.stderr;
        }

        dispatch({
            type: ActionType.BUNDLE_COMPLETE,
            payload: {
                cellId,
                bundle: result,
                stdout,
                stderr
            }
        });
    };

export const setRuntime = (runtime: Runtime) => (dispatch: Dispatch<Action>) => {
    dispatch({
        type: ActionType.CHANGE_RUNTIME,
        payload: {
            runtime
        }
    });
};

// export const showPythonOutput = (cellId: string, codeInput: string) => async (dispatch: Dispatch<Action>) => {
// 	dispatch({
// 		type: ActionType.BUNDLE_COMPLETE,
// 		payload: {
// 			cellId,
// 			bundle: result
// 		}
// 	});
// };
