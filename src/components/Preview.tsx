import React, { useRef, useEffect } from "react";

import htmlTemplate from "../template/IframeTemplate";

interface PreviewProps {
	code: string;
}

const Preview: React.FC<PreviewProps> = ({ code }) => {
	const iframeRef = useRef<any>();

	useEffect(() => {
		iframeRef.current.srcdoc = htmlTemplate;
		iframeRef.current.contentWindow.postMessage(code, "*");
	}, [code]);

	return (
		<iframe
			title="preview"
			ref={iframeRef}
			sandbox="allow-scripts"
			srcDoc={htmlTemplate}
		></iframe>
	);
};

export default Preview;
