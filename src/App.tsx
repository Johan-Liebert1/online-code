import React, { useState, useEffect, useRef } from "react";
import { unpkgPathPlugin } from "./plugins/unpackagePathPlugins";
import * as esbuild from "esbuild-wasm";
import { fetchPlugin } from "./plugins/fetch-plugin";

const App = () => {
	const bundlerRef = useRef<any>();
	const [input, setInput] = useState("");
	const [code, setCode] = useState("");

	const startService = async () => {
		bundlerRef.current = await esbuild.startService({
			worker: true,
			wasmURL: "/esbuild.wasm"
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

		console.log("result = ", result);

		setCode(result.outputFiles[0].text);
	};

	useEffect(() => {
		startService();
	}, []);

	return (
		<div style={{ margin: "2rem" }}>
			<textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
			<button onClick={transpileCode}>submite</button>
			<pre>{code}</pre>
		</div>
	);
};

export default App;
