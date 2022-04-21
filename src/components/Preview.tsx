import React, { useRef, useEffect } from "react";

import htmlTemplate from "../template/IframeTemplate";
import "../styles/Preview.css";
import { useTypedSelector } from "../hooks/useTypedSelector";

interface PreviewProps {
    code?: string;
    error?: string;
    stdout?: string;
    stderr?: string;
}

const Preview: React.FC<PreviewProps> = props => {
    const { code, error, stdout, stderr } = props;
    const iFrameRef = useRef<null | HTMLIFrameElement>(null);
    const runtime = useTypedSelector(state => state.runtime.runtime);

    useEffect(() => {
        if (
            !iFrameRef.current ||
            (runtime === "javascript" && !code) ||
            error === undefined
        )
            return;

        iFrameRef.current.srcdoc = htmlTemplate(error || stderr || "", runtime);

        setTimeout(() => {
            iFrameRef?.current?.contentWindow?.postMessage(
                { code, error, stdout, stderr },
                "*"
            );
        }, 100);
    }, [code, error, stdout, stderr, runtime]);

    return (
        <div className="preview-wrapper">
            <iframe
                title="preview"
                ref={iFrameRef}
                sandbox="allow-scripts"
                srcDoc={htmlTemplate(error || "", runtime)}
            />
        </div>
    );
};

export default Preview;
