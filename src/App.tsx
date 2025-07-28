import { useState, useEffect } from 'react';
import './App.css';
import { componentMap } from './logic/componentmap';
import { generateCodeSnippet } from './logic/generatecode';
import { saveQueryToLocalStorage, getQueriesFromLocalStorage } from "./logic/saveQuery";

function App() {
  // Core app state
  const [input, setInput] = useState('');
  const [matchedComponents, setMatchedComponents] = useState<string[]>([]);
  const [code, setCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [showTour, setShowTour] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [recentQueries, setRecentQueries] = useState<string[]>([]);

  // Load recent queries from localStorage on mount
  useEffect(() => {
    setRecentQueries(getQueriesFromLocalStorage());
  }, []);

  // Check if user has already seen the intro tour
  useEffect(() => {
    const seen = localStorage.getItem('seenTour');
    if (!seen) setShowTour(true);
  }, []);

  // Handle generation logic (match keywords to components)
  const handleGenerate = () => {
    if (!input) return;

    const words = input.toLowerCase().split(/\s+/);
    const components = new Set<string>();

    // Look up each word in our component map
    words.forEach((word) => {
      if (componentMap[word]) {
        componentMap[word].forEach((c) => components.add(c));
      }
    });

    // Save new query to localStorage
    saveQueryToLocalStorage(input);
    setRecentQueries(getQueriesFromLocalStorage());

    const componentList = Array.from(components);
    setMatchedComponents(componentList);
    setCode(generateCodeSnippet(componentList));
  };

  return (
    <div>
      {/* Intro tour modal */}
      {showTour && (
        <div className="modal">
          <div className="box">
            <h2>Welcome!</h2>
            <p>Describe your UI and get suggested components and code.</p>
            <p>If you need help creating a prompt, click the agent button on the right.</p>
            <button
              onClick={() => {
                setShowTour(false);
                localStorage.setItem('seenTour', 'true');
              }}
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      {/* Visa logo */}
      <img src="/logo.png" alt="Logo" className="logo" />

      {/* Assistant toggle button */}
      <button
        className="assistant-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Assistant"
      >
        ?
      </button>

      {/* Assistant panel with example prompt */}
      {isOpen && (
        <div className="agent-ui">
          <h3>Assistant</h3>
          <p>Try typing: “login form with email and password”</p>
        </div>
      )}

      <div className="app">
        <h1>DevSuggest</h1>

        {/* Dropdown with recent prompts (from localStorage) */}
        <label htmlFor="recent">Recent Queries: </label>
        <select
          id="recent"
          onChange={(e) => setInput(e.target.value)}
          className="select"
        >
          <option value="">Select a recent query</option>
          {recentQueries.map((query, idx) => (
            <option key={idx} value={query}>
              {query.slice(0, 30)}...
            </option>
          ))}
        </select>

        {/* Input textarea */}
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your UI..."
        />

        {/* Generate button */}
        <button onClick={handleGenerate} tabIndex={0}>Generate</button>

        {/* Result section */}
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

            {/* Copy to clipboard */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(code);
                setCopied(true);
                setTimeout(() => setCopied(false), 3000); // Clear copied message after 3s
              }}
              aria-label="Copy code to clipboard"
              tabIndex={0}
            >
              Copy Code
            </button>

            {/* Screen reader feedback */}
            <div aria-live="polite" className="sr-only">
              {copied ? "Code copied to clipboard!" : ""}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
