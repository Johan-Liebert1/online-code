import React, { useRef, useEffect } from "react";

import htmlTemplate from "../template/IframeTemplate";
import "../styles/Preview.css";

interface PreviewProps {
	code: string;
}

const Preview: React.FC<PreviewProps> = ({ code }) => {
	const iframeRef = useRef<any>();

	useEffect(() => {
		// console.log(code);
		iframeRef.current.srcdoc = htmlTemplate;

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
				srcDoc={htmlTemplate}
			/>
		</div>
	);
};

export default Preview;
