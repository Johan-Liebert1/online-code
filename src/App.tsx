import React from "react";

import CodeCell from "./components/CodeCell";

import "bulmaswatch/superhero/bulmaswatch.min.css";
import TextEditor from "./components/TextEditor";

const App = () => {
	return (
		<div style={{ margin: "2rem" }}>
			{/* <CodeCell /> */}
			<TextEditor />
		</div>
	);
};

export default App;
