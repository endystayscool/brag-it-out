import React from 'react';
import './App.scss';
import Main from './Main/Main';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link-header"
          href="https://www.instagram.com/brag.it.out/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <code>Brag</code>
          <code>it</code>
          <code>out!</code>
        </a>
      </header>

      <div className="App-body">
        <Main />
      </div>

      {/* <footer className="App-footer">
        <a
          className="App-link"
          href="https://www.instagram.com/brag.it.out/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <code>#bragitoutproject</code>
        </a>
      </footer> */}
    </div>
  );
}

export default App;
