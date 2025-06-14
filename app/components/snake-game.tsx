// filepath: /home/parsa-khosravani/Repos/parsa/app/components/snake-game.tsx
"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

interface Position {
    x: number;
    y: number;
}

const GRID_SIZE = 15;
const INITIAL_SNAKE = [{ x: 7, y: 7 }];
const INITIAL_FOOD = { x: 10, y: 10 };
const INITIAL_DIRECTION = { x: 1, y: 0 };

export function SnakeGame() {
    const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
    const [food, setFood] = useState<Position>(INITIAL_FOOD);
    const [direction, setDirection] = useState<Position>(INITIAL_DIRECTION);
    const [gameRunning, setGameRunning] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    // Refs to avoid unnecessary effect re-runs
    const scoreRef = useRef(score);
    const highScoreRef = useRef(highScore);

    // Load high score from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('snake-highscore');
        if (saved) setHighScore(parseInt(saved));
    }, []);

    // Keep refs in sync with state
    useEffect(() => {
        scoreRef.current = score;
    }, [score]);
    useEffect(() => {
        highScoreRef.current = highScore;
    }, [highScore]);

    const generateFood = useCallback((currentSnake: Position[]) => {
        let newFood: Position;
        do {
            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE)
            };
        } while (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
        return newFood;
    }, []);

    const resetGame = useCallback(() => {
        setSnake(INITIAL_SNAKE);
        setFood(INITIAL_FOOD);
        setDirection(INITIAL_DIRECTION);
        setGameRunning(false);
        setGameOver(false);
        setScore(0);
    }, []);

    const startGame = useCallback(() => {
        if (gameOver) resetGame();
        setGameRunning(true);
    }, [gameOver, resetGame]);

    const pauseGame = useCallback(() => {
        setGameRunning(false);
    }, []);

    // Game loop
    useEffect(() => {
        if (!gameRunning) return;

        const gameInterval = setInterval(() => {
            setSnake(currentSnake => {
                const newSnake = [...currentSnake];
                const head = { ...newSnake[0] };

                head.x += direction.x;
                head.y += direction.y;

                // Check wall collision
                if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
                    setGameRunning(false);
                    setGameOver(true);
                    if (scoreRef.current > highScoreRef.current) {
                        setHighScore(scoreRef.current);
                        localStorage.setItem('snake-highscore', scoreRef.current.toString());
                    }
                    return currentSnake;
                }

                // Check self collision
                if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
                    setGameRunning(false);
                    setGameOver(true);
                    if (scoreRef.current > highScoreRef.current) {
                        setHighScore(scoreRef.current);
                        localStorage.setItem('snake-highscore', scoreRef.current.toString());
                    }
                    return currentSnake;
                }

                newSnake.unshift(head);

                // Check food collision
                if (head.x === food.x && head.y === food.y) {
                    setScore(s => s + 10);
                    setFood(generateFood(newSnake));
                } else {
                    newSnake.pop();
                }

                return newSnake;
            });
        }, 150);

        return () => clearInterval(gameInterval);
    }, [gameRunning, direction, food, generateFood]);

    // Handle keyboard input
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (!gameRunning) return;

            switch (e.key) {
                case 'ArrowUp':
                    if (direction.y === 0) setDirection({ x: 0, y: -1 });
                    break;
                case 'ArrowDown':
                    if (direction.y === 0) setDirection({ x: 0, y: 1 });
                    break;
                case 'ArrowLeft':
                    if (direction.x === 0) setDirection({ x: -1, y: 0 });
                    break;
                case 'ArrowRight':
                    if (direction.x === 0) setDirection({ x: 1, y: 0 });
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [direction, gameRunning]);

    return (
        <div className="relative">
            {/* Toggle Button */}
            <button
                onClick={() => setIsVisible(!isVisible)}
                className="mb-2 px-3 py-1 bg-zinc-800/50 border border-zinc-700 rounded text-zinc-300 hover:bg-zinc-800 transition-colors text-xs"
            >
                🐍 Snake
            </button>

            {/* Game Container */}
            {isVisible && (
                <div className="bg-zinc-900/90 border border-zinc-700 rounded-lg p-4 backdrop-blur-sm">
                    <div className="mb-3 flex justify-between items-center text-xs">
                        <div className="text-zinc-400">
                            Score: <span className="text-zinc-200">{score}</span>
                        </div>
                        <div className="text-zinc-400">
                            Best: <span className="text-zinc-200">{highScore}</span>
                        </div>
                    </div>

                    {/* Game Board */}
                    <div
                        className="relative bg-zinc-800 border border-zinc-600 rounded"
                        style={{
                            width: `${GRID_SIZE * 12}px`,
                            height: `${GRID_SIZE * 12}px`
                        }}
                    >
                        {/* Snake */}
                        {snake.map((segment, index) => (
                            <div
                                key={index}
                                className={`absolute ${index === 0 ? 'bg-green-400' : 'bg-green-500'} rounded-sm`}
                                style={{
                                    left: `${segment.x * 12}px`,
                                    top: `${segment.y * 12}px`,
                                    width: '10px',
                                    height: '10px'
                                }}
                            />
                        ))}

                        {/* Food */}
                        <div
                            className="absolute bg-red-500 rounded-full"
                            style={{
                                left: `${food.x * 12}px`,
                                top: `${food.y * 12}px`,
                                width: '10px',
                                height: '10px'
                            }}
                        />

                        {/* Game Over Overlay */}
                        {gameOver && (
                            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                                <div className="text-center text-zinc-200">
                                    <div className="text-sm font-medium mb-1">Game Over!</div>
                                    <div className="text-xs">Score: {score}</div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Controls */}
                    <div className="mt-3 flex gap-2">
                        <button
                            onClick={gameRunning ? pauseGame : startGame}
                            className="flex-1 flex items-center justify-center gap-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs transition-colors"
                        >
                            {gameRunning ? <Pause size={12} /> : <Play size={12} />}
                            {gameRunning ? 'Pause' : 'Start'}
                        </button>
                        <button
                            onClick={resetGame}
                            className="px-2 py-1 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 rounded text-xs transition-colors"
                        >
                            <RotateCcw size={12} />
                        </button>
                    </div>

                    <div className="mt-2 text-xs text-zinc-500 text-center">
                        Use arrow keys to play
                    </div>
                </div>
            )}
        </div>
    );
}