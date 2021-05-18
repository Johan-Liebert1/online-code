import React from "react";

import "bulmaswatch/superhero/bulmaswatch.min.css";
import CellList from "./components/CellList";

const App = () => {
	return (
		<div style={{ margin: "2rem" }}>
			<div>
				<CellList />
			</div>
		</div>
	);
};

export default App;
