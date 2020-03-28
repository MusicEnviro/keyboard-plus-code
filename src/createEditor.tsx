import React from 'react';
import AceEditor, { IEditorProps } from 'react-ace';

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

export const defaultCode = `() => {
    return [60, 64, 67]
}`

export function createEditor(
	onLoad: (editor: IEditorProps) => void,
    onChange: (value: string, event?: any) => void,
    code: string
) {
    return (
		<AceEditor
			placeholder="Placeholder Text"
			mode="javascript"
			theme="monokai"
			name="blah2"
			onLoad={onLoad}
			onChange={onChange}
            fontSize={14}
            width={"100%"}
            height={"100%"}
			showPrintMargin={true}
			showGutter={true}
			highlightActiveLine={true}
			value={code}
			setOptions={{
				enableBasicAutoCompletion: true,
				enableLiveAutoCompletion: true,
				enableSnippets: false,
				showLineNumbers: true,
				tabSize: 4,
			}}
		/>
	);
}
