import React, { useState, useEffect, useRef } from "react";
import { unpkgPathPlugin } from "./plugins/unpackagePathPlugins";
import * as esbuild from "esbuild-wasm";
import { fetchPlugin } from "./plugins/fetch-plugin";

const App = () => {
	const bundlerRef = useRef<any>();
	const iframeRef = useRef<any>();

	const [input, setInput] = useState("");
	const [code, setCode] = useState("");

	const startService = async () => {
		bundlerRef.current = await esbuild.startService({
			worker: true,
			wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm"
		});
	};

	const transpileCode = async () => {
		if (!bundlerRef.current) return;

		const result = await bundlerRef.current.build({
			entryPoints: ["index.js"],
			bundle: true,
			write: false,
			plugins: [unpkgPathPlugin(), fetchPlugin(input)],
			define: {
				"process.env.NODE_ENV": "'production'",
				global: "window"
			}
		});

		iframeRef.current.contentWindow.postMessage(result.outputFiles[0].text, "*");
	};

	useEffect(() => {
		startService();
	}, []);

	const html = `
    <html>
        <head>
            <style>
                body {
                    color: rgb(200, 200, 200);
                }

                #error {
                    background-color: #2C0502;
                    color: #C54854;
                }
            </style> 
        </head>
        <body>
            <div id="root"></div>
            <div id = "error"></div>
            <script>
                window.addEventListener(
                    "message",
                    event => {
                        // event is coming from the parent object and the event has
                        // some data property
                        // event.data has the code we're trying to execute
                        // console.log(event.data)
                        try {
                            eval(event.data);
                        } catch(err) {
                            document.getElementById('error').innerText = err;
                            console.error(err);
                        }
                    },
                    false
                );
            </script>
        </body>
    </html>
    `;

	return (
		<div style={{ margin: "2rem" }}>
			<textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
			<div>
				<button onClick={transpileCode}>submite</button>
			</div>
			<pre>{code}</pre>
			<iframe ref={iframeRef} sandbox="allow-scripts" srcDoc={html}></iframe>
		</div>
	);
};

export default App;
