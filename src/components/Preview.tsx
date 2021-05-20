import React, { useRef, useEffect } from "react";

import htmlTemplate from "../template/IframeTemplate";
import "../styles/Preview.css";

interface PreviewProps {
	code: string;
	error: string;
}

const Preview: React.FC<PreviewProps> = ({ code, error }) => {
	const iframeRef = useRef<any>();

	useEffect(() => {
		// console.log(code);
		iframeRef.current.srcdoc = htmlTemplate(error);

		setTimeout(() => {
			iframeRef.current.contentWindow.postMessage(code, "*");
		}, 100);
	}, [code]);

	return (
		<div className="preview-wrapper">
			<iframe
				title="preview"
				ref={iframeRef}
				sandbox="allow-scripts"
				srcDoc={htmlTemplate(error)}
			/>
		</div>
	);
};

export default Preview;
