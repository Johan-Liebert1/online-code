import React from "react";

import { ResizableBox, ResizableBoxProps } from "react-resizable";

import "../styles/Resizable.css";

interface ResizableComponentProps {
	direction: "horzontal" | "vertical";
}

const ResizableComponent: React.FC<ResizableComponentProps> = ({
	direction,
	children
}) => {
	let rProps: ResizableBoxProps = {
		height: 300,
		width: Infinity,
		resizeHandles: ["s"],
		maxConstraints: [Infinity, window.innerHeight * 0.9],
		minConstraints: [Infinity, 24]
	};

	if (direction === "horzontal") {
		rProps["className"] = "resize-horizontal";
		rProps.height = Infinity;
		rProps.width = window.innerWidth * 0.75;
		rProps.resizeHandles = ["e"];
		rProps.maxConstraints = [window.innerWidth * 0.75, Infinity];
		rProps.minConstraints = [window.innerWidth * 0.2, Infinity];
	}

	return <ResizableBox {...rProps}>{children}</ResizableBox>;
};

export default ResizableComponent;
