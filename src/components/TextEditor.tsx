import React, { useState, useEffect, useRef } from "react";

import MDEditor from "@uiw/react-md-editor";

import "../styles/TextEditor.css";

const TextEditor: React.FC = () => {
	const [editing, setEditing] = useState(false);
	const [markdownInput, setMarkdownInput] = useState("# Header");

	const markdownEditor = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const listener = (e: MouseEvent) => {
			if (
				e.target &&
				markdownEditor.current &&
				markdownEditor.current.contains(e.target as Node)
			) {
				return;
			}
			setEditing(false);
		};

		document.addEventListener("click", listener, { capture: true });

		return () => {
			document.removeEventListener("click", listener, { capture: true });
		};
	}, []);

	if (editing) {
		return (
			<div ref={markdownEditor} className="text-editor">
				<MDEditor
					value={markdownInput}
					onChange={value => setMarkdownInput(value || "")}
				/>
			</div>
		);
	}
	return (
		<div onClick={() => setEditing(true)} className="text-editor card">
			<div className="card-content">
				<MDEditor.Markdown source={markdownInput} />
			</div>
		</div>
	);
};

export default TextEditor;
