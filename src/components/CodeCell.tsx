import React, { useState } from "react";
import CodeEditor from "./CodeEditor";

import Preview from "./Preview";
import bundler from "../bundler/index";
import ResizableComponent from "./ResizableComponent";

const CodeCell = () => {
	const [input, setInput] = useState("");
	const [code, setCode] = useState("");

	const transpileCode = async () => {
		const output = await bundler(input);
		setCode(output);
	};

	return (
		<>
			<ResizableComponent direction="vertical">
				<div style={{ margin: "2rem", height: "100%" }}>
					<div style={{ display: "flex", height: "100%" }}>
						<CodeEditor initialValue="" onChange={value => setInput(value)} />
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
