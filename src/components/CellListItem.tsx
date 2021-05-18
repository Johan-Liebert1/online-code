import React from "react";
import { Cell } from "../state/cellInterface";
import CodeCell from "./CodeCell";
import TextEditor from "./TextEditor";

interface CellListItemProps {
	cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
	return cell.type === "code" ? <CodeCell /> : <TextEditor />;
};

export default CellListItem;
