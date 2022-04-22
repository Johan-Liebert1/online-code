import React, { useEffect } from "react";

import "bulmaswatch/superhero/bulmaswatch.min.css";
import CellList from "./components/CellList";
import { setRuntime } from "./state/actionCreators/actionCreator";
import { useTypedSelector } from "./hooks/useTypedSelector";

const App = () => {
    const runtime = useTypedSelector(state => state.runtime.runtime);

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
            <h1>{runtime[0].toUpperCase() + runtime.slice(1)}</h1>
            <div>
                <CellList />
            </div>
        </div>
    );
};

export default App;
