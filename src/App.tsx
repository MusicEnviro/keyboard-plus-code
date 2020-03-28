import React, { CSSProperties } from 'react';
import './App.css';

import { PianoKeyboard } from '@musicenviro/ui-elements';
import { createEditor, defaultCode } from './createEditor';
import ReactAce from 'react-ace/lib/ace';

function App() {
	const keyboardRef = React.useRef<PianoKeyboard>();
	
	const [code, setCode] = React.useState<string>(defaultCode)
	const [error, setError] = React.useState<string | null>(null)
	
	function handleCodeChange(value: string, event?: any) {
		setCode(value)

		if (!keyboardRef.current) return;

		try {
			const fn = eval(value);
			const functionOutput = fn();

			if (!Array.isArray(functionOutput)) throw new TypeError('output is not an array');
			// validate
			if (functionOutput.some((elt) => typeof elt !== 'number'))
				throw TypeError('array elements are not all numbers');

			const pitches = functionOutput.map((n) => Math.floor(n));
			keyboardRef.current.setState({ depressedKeys: pitches });
			setError(null)
		} catch (e) {
			if (e.constructor.name === 'TypeError') {
				setError(e.message);
			} else {
				setError('invalid code')
			}
			keyboardRef.current.setState({ depressedKeys: [] });
		}
	}

	function getStatusStyle(): CSSProperties {
		if (error) {
			return {
				backgroundColor: "red"
			}
		} else {
			return {
				backgroundColor: "green"
			}
		}
	}

	React.useEffect(() => handleCodeChange(defaultCode))

	return (
		<div className="App">
			<header>KEYBOARD PLUS CODE</header>
			<div id="main">
				<div id="left-panel">{createEditor(() => {}, handleCodeChange, code)}</div>
				<div id="right-panel">
					<PianoKeyboard
						ref={keyboardRef}
						keyRange={{ min: 36, max: 84 }}
						style={{ height: '30px' }}
					/>
				</div>
			</div>
			<div id="status-bar" style={getStatusStyle()}>{error || 'OK'}</div>
		</div>
	);
}

export default App;
