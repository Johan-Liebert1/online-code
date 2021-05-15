import * as esbuild from "esbuild-wasm";
import axios from "axios";

import localForage from "localforage";

const fileCahce = localForage.createInstance({
	name: "filecache"
});

export const fetchPlugin = (inputCode: string) => {
	return {
		name: "fetchPlugin",
		setup: (build: esbuild.PluginBuild) => {
			build.onLoad({ filter: /.*/ }, async (args: any) => {
				if (args.path === "index.js") {
					return {
						loader: "jsx",
						contents: inputCode
					};
				}

				/*
            check to see if we've already stored the file in cache (indexDB).
            If yes then just return it immediately, else, make a request and store
            the data in indexDB  
            */

				const cachedResult = await fileCahce.getItem<esbuild.OnLoadResult>(
					args.path
				);

				if (cachedResult) {
					return cachedResult;
				} else {
					const { data, request } = await axios.get(args.path);
					// console.log("data = ", data, "request = ", request);

					const fileType = args.path.match(/.css$/) ? "css" : "jsx";

					const contents =
						fileType === "css"
							? `
                                const styles = document.createElement('style');
                                styles.innerText = '${data
									.replace(/\"/g, '\\"')
									.replace(/\'/g, "\\'")
									.replace(/\n/g, "")}';
                                document.head.appendChild(styles);
                            `
							: data;

					let result: esbuild.OnLoadResult = {
						loader: "jsx",
						contents,
						resolveDir: new URL("./", request.responseURL).pathname
					};

					await fileCahce.setItem(args.path, result);

					return result;
				}
			});
		}
	};
};
