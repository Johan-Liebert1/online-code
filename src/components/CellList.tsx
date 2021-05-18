import React from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import CellListItem from "./CellListItem";

const CellList: React.FC = () => {
	const { order, data } = useTypedSelector(state => state.cells);

	const renderedCells = order.map(cellId => (
		<CellListItem cell={data[cellId]} key={cellId} />
	));

	return <div>{renderedCells}</div>;
};

export default CellList;
