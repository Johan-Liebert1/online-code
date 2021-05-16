import React from "react";

import { ResizableBox } from "react-resizable";

import "../styles/Resizable.css";

interface ResizableComponentProps {
	direction: "horzontal" | "vertical";
}

const ResizableComponent: React.FC<ResizableComponentProps> = ({
	direction,
	children
}) => {
	return (
		<ResizableBox
			height={300}
			width={Infinity}
			resizeHandles={["s"]}
			maxConstraints={[Infinity, window.innerHeight * 0.9]}
			minConstraints={[Infinity, 24]}
		>
			{children}
		</ResizableBox>
	);
};

export default ResizableComponent;
