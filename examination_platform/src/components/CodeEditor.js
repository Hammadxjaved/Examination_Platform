import React, { useState, useRef } from 'react';
import Split from 'react-split';
import './styles/ScrollBar.css'
import {OrbitProgress} from 'react-loading-indicators'

export default function CodeEditor() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const testCases = [
    { id: 1, input: 'Input A', expectedOutput: 'Expected Output B' },
    { id: 2, input: 'Input C', expectedOutput: 'Expected Output D' },
  ];

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setOutput(<div className='container'><OrbitProgress variant="track-disc" dense color="#ffffff" size="large" text="" textColor="#000000" /></div>)

    const payload = {
      language: 'python',
      version: '3.10.0',
      files: [
        {
          name: 'main.py',
          content: code,
        },
      ],
    };

    try {
      const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        setOutput(data.run.stdout || '');
        setError(data.run.stderr || '');
      } else {
        setError('Failed to execute the code');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };


  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.target;
      const value = e.target.value;
      const spaces = '    '; // 4 spaces

      setCode(
        value.substring(0, selectionStart) +
        spaces +
        value.substring(selectionEnd)
      );
      
      // Move cursor to the right of the inserted spaces
      e.target.selectionStart = e.target.selectionEnd = selectionStart + spaces.length;
    }
  };

  const containerRef = useRef(null);
  const lineNumberRef = useRef(null);
  const editorRef = useRef(null);
  const handleScroll = () => {
    if (lineNumberRef.current && editorRef.current) {
      lineNumberRef.current.scrollTop = editorRef.current.scrollTop;
    }
  };

  const getLineNumbers = (text) => {
    const lineCount = text.split('\n').length;
    return Array.from({ length: lineCount }, (_, i) => i + 1).join('\n');
  };
  return (
    <div style={{  padding:'10px' }}>
      <Split
        className="split"
        sizes={[50, 50]}
        minSize={200}
        gutterSize={10}
        style={{ height: '100vh', display: 'flex' }}
      >
        {/* Code Editor */}

        <div style={{ display: 'flex', width: '100%', height: '100%' }} ref={containerRef}>
          <div style={{ 
            width: '60px', 
            backgroundColor: '#2d2d2d', 
            color: '#888', 
            padding: '10px', 
            textAlign: 'right', 
            overflowY: 'auto',
            height: '100%',
            fontFamily: 'monospace',
            fontSize: '16px',
            lineHeight: '1.5',
            borderRadius: '5px',
            whiteSpace: 'nowrap',
            position: 'relative', // Ensure proper positioning
          }} ref={lineNumberRef}>
            <pre style={{ margin: 0 }}>{getLineNumbers(code)}</pre>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            onScroll={handleScroll} // Attach scroll event
            ref={editorRef}
            style={{
              flex: 1,
              height: '100%',
              backgroundColor: '#1e1e1e',
              color: 'white',
              border: 'none',
              padding: '10px',
              borderRadius: '5px',
              resize: 'none',
              fontFamily: 'monospace',
              fontSize: '14px',
              lineHeight: '1.5',
              overflowX: 'auto',
              overflowY: 'auto',
              whiteSpace: 'nowrap', // Prevent text wrapping
            }}
            placeholder="Write your code here..."
          />
        </div>

        {/* Output and Test Cases Pane */}
        <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#1e1e1e', padding: '10px',borderRadius: '5px' }}>
          <button
            onClick={handleSubmit}
            style={{
              padding: '10px',
              backgroundColor: '#087d00',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              marginBottom: '10px',
              fontSize: '16px',
              borderRadius: '5px',
              alignSelf: 'flex-start'
            }}
          >
            Run Code
          </button>

          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Output Section */}
            <div
              style={{
                padding: '10px',
                color: 'white',
                backgroundColor: '#252526',
                borderRadius: '5px',
                overflowY: 'auto',
                marginBottom: '10px',
                flex: 1, // Make the output section take 50% of the vertical space
                textAlign:'center'
              }}
            >
              <h3>Output:</h3>

              <div>{output || error}</div>
            </div>

            {/* Test Cases Section */}
            <div
              style={{
                padding: '10px',
                color: 'white',
                backgroundColor: '#252526',
                borderRadius: '5px',
                overflowY: 'auto',
                flex: 1 // Make the test case section take 50% of the vertical space
              }}
            >
              <h3>Test Cases:</h3>
              <div
                style={{
                  backgroundColor: '#333',
                  padding: '10px',
                  borderRadius: '5px',
                  color: 'white',
                  fontSize: '14px',
                }}
              >
                {testCases.map((testCase) => (
                  <div key={testCase.id} style={{ marginBottom: '10px' }}>
                    <strong>Test Case {testCase.id}:</strong>
                    <p>Input: {testCase.input}</p>
                    <p>Expected Output: {testCase.expectedOutput}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Split>
    </div>
  );
}
