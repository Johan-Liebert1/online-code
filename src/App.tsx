import React, { useState, useEffect, useRef } from "react";
import { unpkgPathPlugin } from "./plugins/unpackagePathPlugins";
import * as esbuild from "esbuild-wasm";
import { fetchPlugin } from "./plugins/fetch-plugin";
import CodeEditor from "./components/CodeEditor";

import "bulmaswatch/superhero/bulmaswatch.min.css";
import Preview from "./components/Preview";

const App = () => {
	const bundlerRef = useRef<any>();

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

		setCode(result.outputFiles[0].text);
	};

	useEffect(() => {
		startService();
	}, []);

	return (
		<div style={{ margin: "2rem" }}>
			{/* <textarea value={input} onChange={e => setInput(e.target.value)}></textarea> */}
			<CodeEditor initialValue="" onChange={value => setInput(value)} />
			<div>
				<button onClick={transpileCode}>submite</button>
			</div>
			<Preview code={code} />
		</div>
	);
};

export default App;
