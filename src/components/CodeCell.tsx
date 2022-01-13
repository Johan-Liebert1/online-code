import React, { useEffect, useRef } from "react";
import CodeEditor from "./CodeEditor";

import Preview from "./Preview";
import ResizableComponent from "./ResizableComponent";
import { Cell } from "../state/cellInterface";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";

import "../styles/CodeCell.css";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();

  const bundle = useTypedSelector(state => state.bundles[cell.id]);
  const cumulativeCode = useTypedSelector(state => {
    const { data, order } = state.cells;

    const orderedCells = order.map(cellId => data[cellId]);

    const cumulativeCode = [];

    for (let c of orderedCells) {
      if (c.type === "code") {
        cumulativeCode.push(c.content);
      }
      // if (c.id === cell.id) break;
    }

    return cumulativeCode;
  });

  const transpileCode = async () => {
    createBundle(cell.id, cumulativeCode.join("\n"));
  };

  useEffect(() => {
    const timer = setTimeout(transpileCode, 1500);

    return () => {
      // if we return a function from use effect, then that funciton will
      // we automaticallly called the next time use effect is called
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive/deps
  }, [cumulativeCode]);

  return (
    <ResizableComponent direction="vertical">
      <div style={{ height: "100%" }}>
        <div style={{ display: "flex", height: "100%" }}>
          <ResizableComponent direction="horzontal">
            <CodeEditor
              initialValue={cell.content}
              onChange={value => updateCell(cell.id, value)}
            />
          </ResizableComponent>

          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100"></progress>
            </div>
          ) : (
            <Preview code={bundle.code} error={bundle.error} />
          )}
        </div>
      </div>
    </ResizableComponent>
  );
};

export default CodeCell;
