import {
	DeleteCellAction,
	InserCellBeforeAction,
	MoveCellAction,
	UpdateCellAction,
	Direction
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

export const insertCellBefore = (id: string, type: CellTypes): InserCellBeforeAction => {
	return {
		type: ActionType.INSERT_CELL_BEFORE,
		payload: { id, type }
	};
};