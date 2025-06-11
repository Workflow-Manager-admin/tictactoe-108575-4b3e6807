import React from 'react';
import './App.css';
import TicTacToe from './TicTacToe';

// PUBLIC_INTERFACE
function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <button className="btn" style={{ opacity: 0.7, pointerEvents: 'none' }}>
              Template
            </button>
          </div>
        </div>
      </nav>

      <main>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          minHeight: 'calc(95vh - 80px)'
        }}>
          <h1 className="title" style={{ marginTop: '100px', marginBottom: '32px', fontSize: '2rem', fontWeight: '600' }}>
            Tic Tac Toe
          </h1>
          <TicTacToe />
        </div>
      </main>
    </div>
  );
}

export default App;