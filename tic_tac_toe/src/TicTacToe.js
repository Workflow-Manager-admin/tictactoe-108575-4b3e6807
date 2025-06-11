import React, { useState } from "react";

/*
PUBLIC_INTERFACE
TicTacToe: Main game container component
Implements two-player local Tic Tac Toe with win/draw detection, player indicator, reset, and minimalist design.

Color palette (CSS custom properties at top):
  --ttt-primary: #2da942;
  --ttt-secondary: #000000;
  --ttt-accent: #2196f3;
*/

const BOARD_SIZE = 3;
const EMPTY_BOARD = Array(BOARD_SIZE * BOARD_SIZE).fill(null);
const PLAYER_X = "X";
const PLAYER_O = "O";

// Returns an array of all the winning combinations for a 3x3 board
function getWinningCombos() {
  const combos = [];
  // Rows
  for (let r = 0; r < BOARD_SIZE; r++) {
    combos.push(
      Array.from({ length: BOARD_SIZE }, (_, c) => r * BOARD_SIZE + c)
    );
  }
  // Columns
  for (let c = 0; c < BOARD_SIZE; c++) {
    combos.push(
      Array.from({ length: BOARD_SIZE }, (_, r) => r * BOARD_SIZE + c)
    );
  }
  // Diagonals
  combos.push([0, 4, 8]);
  combos.push([2, 4, 6]);
  return combos;
}

const WINNING_COMBOS = getWinningCombos();

// PUBLIC_INTERFACE
function TicTacToe() {
  /** Main Tic Tac Toe container. */
  const [board, setBoard] = useState(EMPTY_BOARD);
  const [xIsNext, setXIsNext] = useState(true);
  const [gameResult, setGameResult] = useState(null); // null | 'draw' | {winner: 'X' | 'O', combo: number[]}

  // PUBLIC_INTERFACE
  function handleCellClick(idx) {
    if (board[idx] !== null || gameResult) return; // Ignore if occupied or game over
    const newBoard = board.slice();
    newBoard[idx] = xIsNext ? PLAYER_X : PLAYER_O;
    const result = checkGameResult(newBoard);
    setBoard(newBoard);
    setXIsNext((prev) => !prev);
    setGameResult(result);
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    setBoard(EMPTY_BOARD);
    setXIsNext(true);
    setGameResult(null);
  }

  // Check board state for a win or draw
  function checkGameResult(boardArr) {
    for (let combo of WINNING_COMBOS) {
      const [a, b, c] = combo;
      if (
        boardArr[a] &&
        boardArr[a] === boardArr[b] &&
        boardArr[a] === boardArr[c]
      ) {
        return { winner: boardArr[a], combo };
      }
    }
    if (boardArr.every((cell) => cell !== null)) {
      return "draw";
    }
    return null;
  }

  // Get game status message (player turn or result)
  function getStatus() {
    if (gameResult === "draw") {
      return (
        <span style={{ color: "var(--ttt-accent)", fontWeight: 600 }}>
          Draw! Nobody wins.
        </span>
      );
    }
    if (gameResult && gameResult.winner) {
      return (
        <span style={{ color: "var(--ttt-primary)", fontWeight: 700 }}>
          {gameResult.winner} wins!
        </span>
      );
    }
    return (
      <>
        Next Turn:{" "}
        <span
          style={{
            color: xIsNext ? "var(--ttt-primary)" : "var(--ttt-accent)",
            fontWeight: 500,
          }}
        >
          {xIsNext ? "X" : "O"}
        </span>
      </>
    );
  }

  // Render a single cell
  function renderCell(idx) {
    const isWinningCell =
      gameResult && gameResult.combo && gameResult.combo.includes(idx);
    return (
      <button
        key={idx}
        className="ttt-cell"
        onClick={() => handleCellClick(idx)}
        disabled={!!board[idx] || !!gameResult}
        aria-label={`cell ${idx + 1}`}
        style={{
          color:
            board[idx] === PLAYER_X
              ? "var(--ttt-primary)"
              : board[idx] === PLAYER_O
              ? "var(--ttt-accent)"
              : "var(--ttt-secondary)",
          borderColor: isWinningCell ? "var(--ttt-primary)" : "var(--ttt-border, #eee)",
          background:
            isWinningCell
              ? "rgba(45,169,66,0.05)"
              : "transparent",
          cursor: board[idx] || gameResult ? "not-allowed" : "pointer",
        }}
      >
        {board[idx]}
      </button>
    );
  }

  // Main render
  return (
    <div className="ttt-outer">
      <div className="ttt-status" role="status">
        {getStatus()}
      </div>
      <div className="ttt-board">
        {board.map((_, idx) => renderCell(idx))}
      </div>
      <button className="ttt-reset-btn" onClick={handleReset}>
        Reset Game
      </button>
      {/* Minimal CSS-in-JS: apply color palette via custom properties */}
      <style>
        {`
          .ttt-outer {
            --ttt-primary: #2da942;
            --ttt-secondary: #000000;
            --ttt-accent: #2196f3;
            --ttt-border: #222;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 60vh;
            margin: 0 auto;
            padding: 1rem 0 2.5rem 0;
          }
          .ttt-status {
            font-size: 1.15rem;
            margin-bottom: 1.3rem;
            min-height: 2.1em;
            text-align: center;
            letter-spacing: 0.02em;
          }
          .ttt-board {
            display: grid;
            grid-template-columns: repeat(3, 56px);
            grid-template-rows: repeat(3, 56px);
            gap: 0.6rem;
            background: none;
            padding: 0.2rem;
            border-radius: 1.2rem;
            box-shadow: 0 1px 8px rgba(34,34,34,0.09);
            margin-bottom: 1.8rem;
          }
          .ttt-cell {
            width: 56px;
            height: 56px;
            font-size: 2.1rem;
            font-family: inherit;
            font-weight: 600;
            text-align: center;
            border: 2px solid var(--ttt-border, #ccc);
            border-radius: 0.6rem;
            background: transparent;
            outline: none;
            transition: border-color 0.15s, background 0.18s;
          }
          .ttt-cell:enabled:hover {
            border-color: var(--ttt-accent);
            background: rgba(33, 150, 243, 0.08);
          }
          .ttt-reset-btn {
            margin-top: 0.5rem;
            background: var(--ttt-accent);
            color: #fff;
            border: none;
            font-size: 1.09rem;
            font-weight: 500;
            border-radius: 0.5rem;
            padding: 0.48rem 1.4rem;
            cursor: pointer;
            transition: background 0.15s;
          }
          .ttt-reset-btn:hover {
            background: #1976d2;
          }
          @media (max-width: 480px) {
            .ttt-board {
              grid-template-columns: repeat(3, 38px);
              grid-template-rows: repeat(3, 38px);
              gap: 0.4rem;
            }
            .ttt-cell {
              width: 38px;
              height: 38px;
              font-size: 1.26rem;
            }
          }
        `}
      </style>
    </div>
  );
}

export default TicTacToe;
