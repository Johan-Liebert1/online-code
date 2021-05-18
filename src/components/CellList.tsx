import React, { Fragment } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import AddCell from "./AddCell";
import CellListItem from "./CellListItem";

const CellList: React.FC = () => {
	const { order, data } = useTypedSelector(state => state.cells);

	const renderedCells = order.map(cellId => (
		<Fragment key={cellId}>
			<AddCell nextCellId={cellId} />
			<CellListItem cell={data[cellId]} />
		</Fragment>
	));

	return (
		<div>
			{renderedCells} <AddCell nextCellId={null} />{" "}
		</div>
	);
};

export default CellList;
