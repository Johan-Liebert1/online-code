import React from "react";
import { useActions } from "../hooks/useActions";

import "../styles/AddCell.css";

interface AddCellProps {
	nextCellId: string | null;
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId }) => {
	const { insertCellBefore } = useActions();

	return (
		<div className="add-cell">
			<div className="add-cell-divider"></div>

			<button
				className="button is-primary"
				onClick={() => insertCellBefore(nextCellId, "code")}
			>
				<span className="icon is-small">
					<i className="fas fa-plus"></i>
				</span>
				<span>Code</span>
			</button>
			<button
				className="button is-primary"
				onClick={() => insertCellBefore(nextCellId, "text")}
			>
				<span className="icon is-small">
					<i className="fas fa-plus" />
				</span>
				<span>Text</span>
			</button>
		</div>
	);
};

export default AddCell;
