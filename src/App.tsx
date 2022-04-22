import React, { useEffect } from "react";

import "bulmaswatch/superhero/bulmaswatch.min.css";
import CellList from "./components/CellList";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { useActions } from "./hooks/useActions";

const App = () => {
    const runtime = useTypedSelector(state => state.runtime.runtime);

    const { setRuntime } = useActions();

    useEffect(() => {
        document.title = "Sandbox JS";

        switch (runtime) {
            case "python":
                document.title = "Sandbox Py";
                break;

            case "javascript":
                document.title = "Sandbox JS";
                break;
        }
    }, [runtime]);

    return (
        <div style={{ margin: "2rem" }}>
            <div
                style={{
                    width: "100%",
                    margin: "1rem 0",
                    fontSize: "1.5rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <button
                    className="button is-primary"
                    style={{ marginRight: "2rem" }}
                    disabled={runtime === "python"}
                    onClick={() => runtime !== "python" && setRuntime("python")}
                >
                    Python
                </button>

                <button
                    className="button is-primary"
                    disabled={runtime === "javascript"}
                    onClick={() => runtime !== "javascript" && setRuntime("javascript")}
                >
                    JavaScript
                </button>
            </div>

            <h1 style={{ fontSize: "1.5rem", textAlign: "center" }}>
                {runtime === "python" ? "Python" : "JavaScript"}
            </h1>

            <div>
                <CellList />
            </div>
        </div>
    );
};

export default App;
