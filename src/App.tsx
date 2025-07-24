import { useState } from 'react';
import './App.css';
import { componentMap } from './logic/componentmap';
import { generateCodeSnippet } from './logic/generatecode';

function App() {
  const [input, setInput] = useState('');
  const [matchedComponents, setMatchedComponents] = useState<string[]>([]);
  const [code, setCode] = useState('');

  const handleGenerate = () => {
    const words = input.toLowerCase().split(/\s+/);
    const components = new Set<string>();

    words.forEach((word) => {
      if (componentMap[word]) {
        componentMap[word].forEach((c) => components.add(c));
      }
    });

    const componentList = Array.from(components);
    setMatchedComponents(componentList);
    setCode(generateCodeSnippet(componentList));
  };

  return (
    <div className="app">
      <h1>Visa Component Suggester</h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Describe your UI..."
      />

      <button onClick={handleGenerate}>Generate</button>

      {matchedComponents.length > 0 && (
        <div className="results">
          <h2>Suggested Components</h2>
          <ul>
            {matchedComponents.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>

          <h2>Code Snippet</h2>
          <pre>
            <code>{code}</code>
          </pre>

          <button onClick={() => navigator.clipboard.writeText(code)}>
  Copy Code
</button>

        </div>
      )}
    </div>
  );
}

export default App;
