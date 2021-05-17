import { ActionType } from "../actionTypes/actionTypes";
import { CellTypes } from "../cellInterface";

interface MoveCellAction {
	type: ActionType.MOVE_CELL;
	payload: {
		id: string;
		direction: "up" | "down";
	};
}

interface DeleteCellAction {
	type: ActionType.DELETE_CELL;
	payload: string;
}

interface UpdateCellAction {
	type: ActionType.UPDATE_CELL;
	payload: {
		id: string;
		content: string;
	};
}

interface InserCellBeforeAction {
	type: ActionType.INSERT_CELL_BEFORE;
	payload: {
		id: string;
		type: CellTypes;
	};
}

export type Action =
	| MoveCellAction
	| DeleteCellAction
	| UpdateCellAction
	| InserCellBeforeAction;
