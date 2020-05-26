import React from 'react';
import './App.scss';
import Main from './Main/Main';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <code>Brag</code>
        <code>it</code>
        <code>out!</code>
      </header>

      <body className="App-body">
        <Main />
      </body>

      <footer className="App-footer">
        {/* <code>
        follow 👉
      </code> */}
        <a
          className="App-link"
          href="https://www.instagram.com/brag.it.out/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <code>#bragitoutproject</code>
        </a>
      </footer>
    </div>
  );
}

export default App;
