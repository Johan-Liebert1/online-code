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

        switch (window.location.pathname) {
            case "/":
                window.location.href = "/javascript";
                break;

            case "/javascript":
                setRuntime("javascript");
                document.title = "Sandbox JS";
                break;

            case "/python":
                setRuntime("python");
                document.title = "Sandbox Py";
                break;

            default:
                setRuntime("javascript");
                document.title = "Sandbox JS";
                break;
        }
    }, []);

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
                    onClick={() =>
                        runtime !== "python" && (window.location.href = "/python")
                    }
                >
                    Python
                </button>

                <button
                    className="button is-primary"
                    disabled={runtime === "javascript"}
                    onClick={() =>
                        runtime !== "javascript" && (window.location.href = "/javascript")
                    }
                >
                    JavaScript
                </button>
            </div>

            <div>
                <CellList />
            </div>
        </div>
    );
};

export default App;
