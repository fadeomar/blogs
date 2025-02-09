"use client";
import { useState } from "react";
import SnakeGame from "@/components/snakeGame/SnakeGame";

export default function Home() {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [reset, setReset] = useState(false);

  const handleScoreUpdate = (newScore) => {
    setScore(newScore);
  };

  const handleGameOver = () => {
    setGameOver(true);
  };

  const resetGame = () => {
    setScore(0);
    setGameOver(false);
    setReset(true);
    setTimeout(() => setReset(false), 0); // Reset immediately after triggering the reset state
  };

  const handleDirectionChange = (direction) => {
    const event = new KeyboardEvent("keydown", { key: direction });
    document.dispatchEvent(event);
  };

  return (
    <div className="game-container" style={{ textAlign: "center" }}>
      <div className="sidebar">
        <h2>
          Score: <span id="score">{score}</span>
        </h2>
        <div className="controls">
          <button
            className="button"
            onClick={() => handleDirectionChange("ArrowUp")}
          >
            ↑ / W
          </button>
          <button
            className="button"
            onClick={() => handleDirectionChange("ArrowLeft")}
          >
            ← / A
          </button>
          <button
            className="button"
            onClick={() => handleDirectionChange("ArrowDown")}
          >
            ↓ / D
          </button>
          <button
            className="button"
            onClick={() => handleDirectionChange("ArrowRight")}
          >
            → / S
          </button>
        </div>
        {gameOver && (
          <button className="game_button" onClick={resetGame}>
            Play Again
          </button>
        )}
      </div>
      <SnakeGame
        onScoreUpdate={handleScoreUpdate}
        onGameOver={handleGameOver}
        reset={reset}
      />
    </div>
  );
}
