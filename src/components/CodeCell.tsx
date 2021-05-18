import React, { useState, useEffect } from "react";
import CodeEditor from "./CodeEditor";

import Preview from "./Preview";
import bundler from "../bundler/index";
import ResizableComponent from "./ResizableComponent";
import { Cell } from "../state/cellInterface";
import { useActions } from "../hooks/useActions";

interface CodeCellProps {
	cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
	const [code, setCode] = useState("");

	const { updateCell } = useActions();

	const transpileCode = async () => {
		const output = await bundler(cell.content);
		setCode(output.code);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			transpileCode();
		}, 1000);

		return () => {
			// if we return a function from use effect, then that funciton will
			// we automaticallly called the next time use effect is called
			clearTimeout(timer);
		};
	}, [cell.content]);

	return (
		<>
			<ResizableComponent direction="vertical">
				<div style={{ margin: "2rem", height: "100%" }}>
					<div style={{ display: "flex", height: "100%" }}>
						<CodeEditor
							initialValue={cell.content}
							onChange={value => updateCell(cell.id, value)}
						/>
						<Preview code={code} />
					</div>
					{/* <div>
                            <button onClick={transpileCode} className="button is-success">
                                Submit
                            </button>
				        </div> 
                    */}
				</div>
			</ResizableComponent>
		</>
	);
};

export default CodeCell;
