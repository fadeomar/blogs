"use client";
import React, { useState, useEffect, useRef } from "react";

interface SnakeGameProps {
  onScoreUpdate: (score: number) => void;
  onGameOver: () => void;
  reset: boolean;
}

const SnakeGame: React.FC<SnakeGameProps> = ({
  onScoreUpdate,
  onGameOver,
  reset,
}) => {
  const canvasRef = useRef(null);
  const lastUpdateTimeRef = useRef(0);
  const animationFrameIdRef = useRef(null);
  const gameSpeed = useRef(100);

  const [snake, setSnake] = useState([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [nextDirection, setNextDirection] = useState({ x: 1, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const tileSize = 20;
  const canvasSize = 400;

  useEffect(() => {
    if (reset) {
      setSnake([
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 },
      ]);
      setFood({ x: 15, y: 15 });
      setDirection({ x: 1, y: 0 });
      setNextDirection({ x: 1, y: 0 });
      setScore(0);
      setGameOver(false);
      onScoreUpdate(0);
    }
  }, [reset, onScoreUpdate]);

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    const handleKeyDown = (e) => {
      if (
        [
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
          "w",
          "a",
          "s",
          "d",
        ].includes(e.key)
      ) {
        e.preventDefault(); // Stop page scrolling
      }

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
        case "ص":
          if (direction.y === 0) setNextDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
        case "s":
        case "S":
        case "س":
          if (direction.y === 0) setNextDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
        case "a":
        case "A":
        case "ش":
          if (direction.x === 0) setNextDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
        case "d":
        case "D":
        case "ي":
          if (direction.x === 0) setNextDirection({ x: 1, y: 0 });
          break;
      }
    };

    const moveSnake = () => {
      if (gameOver) return;

      const newSnake = [...snake];
      const head = {
        x: newSnake[0].x + nextDirection.x,
        y: newSnake[0].y + nextDirection.y,
      };

      if (
        head.x < 0 ||
        head.x >= canvasSize / tileSize ||
        head.y < 0 ||
        head.y >= canvasSize / tileSize
      ) {
        setGameOver(true);
        onGameOver();
        return;
      }

      for (let i = 1; i < newSnake.length; i++) {
        if (head.x === newSnake[i].x && head.y === newSnake[i].y) {
          setGameOver(true);
          onGameOver();
          return;
        }
      }

      newSnake.unshift(head);
      setDirection(nextDirection);

      if (head.x === food.x && head.y === food.y) {
        setFood({
          x: Math.floor(Math.random() * (canvasSize / tileSize)),
          y: Math.floor(Math.random() * (canvasSize / tileSize)),
        });
        setScore(score + 1);
        onScoreUpdate(score + 1);
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    };

    const drawGame = () => {
      context.fillStyle = "#222";
      context.fillRect(0, 0, canvasSize, canvasSize);
      context.strokeStyle = "#fff";
      context.lineWidth = 4;
      context.strokeRect(0, 0, canvasSize, canvasSize);

      context.fillStyle = "red";
      context.fillRect(
        food.x * tileSize,
        food.y * tileSize,
        tileSize,
        tileSize
      );

      // context.fillStyle = "lime";
      // for (const segment of snake) {
      //   context.fillRect(
      //     segment.x * tileSize,
      //     segment.y * tileSize,
      //     tileSize,
      //     tileSize
      //   );
      // }

      snake.forEach((segment, index) => {
        context.fillStyle = index === 0 ? "darkgreen" : "limegreen"; // Head is darker
        context.beginPath();

        // Snake head (larger and with eyes)
        if (index === 0) {
          context.arc(
            segment.x * tileSize,
            segment.y * tileSize,
            15,
            0,
            Math.PI * 2
          );
          context.fill();

          // Draw eyes
          context.fillStyle = "white";
          context.beginPath();
          context.arc(
            segment.x * tileSize + 4,
            segment.y * tileSize + 2,
            2.5,
            0,
            Math.PI * 2
          ); // Left eye
          context.arc(
            segment.x * tileSize + 10,
            segment.y * tileSize + 2,
            2.5,
            0,
            Math.PI * 2
          ); // Right eye
          context.fill();

          context.fillStyle = "black";
          context.beginPath();
          context.arc(
            segment.x * tileSize + 4,
            segment.y * tileSize + 2,
            1.5,
            0,
            Math.PI * 2
          ); // Pupils
          context.arc(
            segment.x * tileSize + 10,
            segment.y * tileSize + 2,
            1.5,
            0,
            Math.PI * 2
          );
          context.fill();
        }
        // Body with rounded segments
        else if (index === snake.length - 1) {
          context.arc(
            segment.x * tileSize,
            segment.y * tileSize,
            7,
            0,
            Math.PI * 2
          ); // Tail smaller
          context.fill();
        } else {
          context.arc(
            segment.x * tileSize,
            segment.y * tileSize,
            8,
            0,
            Math.PI * 2
          );
          context.fill();
        }
      });

      if (gameOver) {
        context.fillStyle = "white";
        context.font = "bold 40px sans-serif";
        context.fillText("Game Over", 100, 200);
      }
    };

    const gameLoop = (timestamp) => {
      if (gameOver) return;

      if (!lastUpdateTimeRef.current) {
        lastUpdateTimeRef.current = timestamp;
      }

      const elapsed = timestamp - lastUpdateTimeRef.current;

      if (elapsed > gameSpeed.current) {
        lastUpdateTimeRef.current = timestamp;
        moveSnake();
        drawGame();
      }

      animationFrameIdRef.current = requestAnimationFrame(gameLoop);
    };

    document.addEventListener("keydown", handleKeyDown);
    animationFrameIdRef.current = requestAnimationFrame(gameLoop);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, [
    snake,
    direction,
    nextDirection,
    food,
    gameOver,
    score,
    onScoreUpdate,
    onGameOver,
  ]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize}
      height={canvasSize}
      className="snake-canvas"
    />
  );
};

export default SnakeGame;
