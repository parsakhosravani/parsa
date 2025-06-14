"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, RotateCcw, Square } from "lucide-react";

type TetrominoType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';
type CellType = TetrominoType | null;

interface Tetromino {
    type: TetrominoType;
    shape: number[][];
    x: number;
    y: number;
    color: string;
}

interface GameState {
    board: CellType[][];
    currentPiece: Tetromino | null;
    nextPiece: Tetromino | null;
    score: number;
    lines: number;
    level: number;
    gameOver: boolean;
    paused: boolean;
}

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const CELL_SIZE = 20;

// Tetromino shapes
const TETROMINOS: Record<TetrominoType, { shape: number[][]; color: string }> = {
    I: {
        shape: [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        color: '#00FFFF'
    },
    O: {
        shape: [
            [1, 1],
            [1, 1]
        ],
        color: '#FFFF00'
    },
    T: {
        shape: [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        color: '#800080'
    },
    S: {
        shape: [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]
        ],
        color: '#00FF00'
    },
    Z: {
        shape: [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]
        ],
        color: '#FF0000'
    },
    J: {
        shape: [
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        color: '#0000FF'
    },
    L: {
        shape: [
            [0, 0, 1],
            [1, 1, 1],
            [0, 0, 0]
        ],
        color: '#FFA500'
    }
};

export function TetrisGame() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [gameState, setGameState] = useState<GameState>({
        board: Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null)),
        currentPiece: null,
        nextPiece: null,
        score: 0,
        lines: 0,
        level: 1,
        gameOver: false,
        paused: false
    });
    const [gameRunning, setGameRunning] = useState(false);
    const [dropTime, setDropTime] = useState(1000);
    const [lastDrop, setLastDrop] = useState(0);

    // Generate random tetromino
    const getRandomTetromino = useCallback((): Tetromino => {
        const types: TetrominoType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
        const type = types[Math.floor(Math.random() * types.length)];
        const template = TETROMINOS[type];

        return {
            type,
            shape: template.shape,
            x: Math.floor(BOARD_WIDTH / 2) - Math.floor(template.shape[0].length / 2),
            y: 0,
            color: template.color
        };
    }, []);

    // Initialize game
    const initGame = useCallback(() => {
        const newBoard = Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null));
        const currentPiece = getRandomTetromino();
        const nextPiece = getRandomTetromino();

        setGameState({
            board: newBoard,
            currentPiece,
            nextPiece,
            score: 0,
            lines: 0,
            level: 1,
            gameOver: false,
            paused: false
        });
        setDropTime(1000);
        setLastDrop(Date.now());
    }, [getRandomTetromino]);

    // Check collision
    const checkCollision = useCallback((piece: Tetromino, board: CellType[][], dx = 0, dy = 0): boolean => {
        for (let y = 0; y < piece.shape.length; y++) {
            for (let x = 0; x < piece.shape[y].length; x++) {
                if (piece.shape[y][x]) {
                    const newX = piece.x + x + dx;
                    const newY = piece.y + y + dy;

                    if (
                        newX < 0 ||
                        newX >= BOARD_WIDTH ||
                        newY >= BOARD_HEIGHT ||
                        (newY >= 0 && board[newY][newX])
                    ) {
                        return true;
                    }
                }
            }
        }
        return false;
    }, []);

    // Rotate piece
    const rotatePiece = useCallback((piece: Tetromino): Tetromino => {
        const rotated = piece.shape[0].map((_, i) =>
            piece.shape.map(row => row[i]).reverse()
        );

        return {
            ...piece,
            shape: rotated
        };
    }, []);

    // Place piece on board
    const placePiece = useCallback((piece: Tetromino, board: CellType[][]): CellType[][] => {
        const newBoard = board.map(row => [...row]);

        for (let y = 0; y < piece.shape.length; y++) {
            for (let x = 0; x < piece.shape[y].length; x++) {
                if (piece.shape[y][x] && piece.y + y >= 0) {
                    newBoard[piece.y + y][piece.x + x] = piece.type;
                }
            }
        }

        return newBoard;
    }, []);

    // Clear completed lines
    const clearLines = useCallback((board: CellType[][]): { newBoard: CellType[][]; linesCleared: number } => {
        const newBoard = board.filter(row => row.some(cell => cell === null));
        const linesCleared = BOARD_HEIGHT - newBoard.length;

        // Add empty rows at the top
        while (newBoard.length < BOARD_HEIGHT) {
            newBoard.unshift(Array(BOARD_WIDTH).fill(null));
        }

        return { newBoard, linesCleared };
    }, []);

    // Move piece
    const movePiece = useCallback((dx: number, dy: number) => {
        setGameState(prevState => {
            if (!prevState.currentPiece || prevState.gameOver || prevState.paused) return prevState;

            if (!checkCollision(prevState.currentPiece, prevState.board, dx, dy)) {
                return {
                    ...prevState,
                    currentPiece: {
                        ...prevState.currentPiece,
                        x: prevState.currentPiece.x + dx,
                        y: prevState.currentPiece.y + dy
                    }
                };
            }

            return prevState;
        });
    }, [checkCollision]);

    // Rotate current piece
    const rotateCurrent = useCallback(() => {
        setGameState(prevState => {
            if (!prevState.currentPiece || prevState.gameOver || prevState.paused) return prevState;

            const rotatedPiece = rotatePiece(prevState.currentPiece);

            if (!checkCollision(rotatedPiece, prevState.board)) {
                return {
                    ...prevState,
                    currentPiece: rotatedPiece
                };
            }

            return prevState;
        });
    }, [rotatePiece, checkCollision]);

    // Drop piece
    const dropPiece = useCallback(() => {
        setGameState(prevState => {
            if (!prevState.currentPiece || prevState.gameOver || prevState.paused) return prevState;

            if (!checkCollision(prevState.currentPiece, prevState.board, 0, 1)) {
                return {
                    ...prevState,
                    currentPiece: {
                        ...prevState.currentPiece,
                        y: prevState.currentPiece.y + 1
                    }
                };
            } else {
                // Place piece and get new one
                const newBoard = placePiece(prevState.currentPiece, prevState.board);
                const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);

                const newScore = prevState.score +
                    (linesCleared * 100 * prevState.level) +
                    (linesCleared === 4 ? 300 * prevState.level : 0); // Tetris bonus

                const newLines = prevState.lines + linesCleared;
                const newLevel = Math.floor(newLines / 10) + 1;

                const newCurrentPiece = prevState.nextPiece;
                const newNextPiece = getRandomTetromino();

                // Check game over
                const gameOver = newCurrentPiece ? checkCollision(newCurrentPiece, clearedBoard) : false;

                return {
                    ...prevState,
                    board: clearedBoard,
                    currentPiece: gameOver ? null : newCurrentPiece,
                    nextPiece: newNextPiece,
                    score: newScore,
                    lines: newLines,
                    level: newLevel,
                    gameOver
                };
            }
        });
    }, [checkCollision, placePiece, clearLines, getRandomTetromino]);

    // Hard drop
    const hardDrop = useCallback(() => {
        setGameState(prevState => {
            if (!prevState.currentPiece || prevState.gameOver || prevState.paused) return prevState;

            let dropDistance = 0;
            while (!checkCollision(prevState.currentPiece, prevState.board, 0, dropDistance + 1)) {
                dropDistance++;
            }

            const droppedPiece = {
                ...prevState.currentPiece,
                y: prevState.currentPiece.y + dropDistance
            };

            const newBoard = placePiece(droppedPiece, prevState.board);
            const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);

            const newScore = prevState.score +
                (linesCleared * 100 * prevState.level) +
                (linesCleared === 4 ? 300 * prevState.level : 0) +
                dropDistance * 2; // Hard drop bonus

            const newLines = prevState.lines + linesCleared;
            const newLevel = Math.floor(newLines / 10) + 1;

            const newCurrentPiece = prevState.nextPiece;
            const newNextPiece = getRandomTetromino();

            const gameOver = newCurrentPiece ? checkCollision(newCurrentPiece, clearedBoard) : false;

            return {
                ...prevState,
                board: clearedBoard,
                currentPiece: gameOver ? null : newCurrentPiece,
                nextPiece: newNextPiece,
                score: newScore,
                lines: newLines,
                level: newLevel,
                gameOver
            };
        });
    }, [checkCollision, placePiece, clearLines, getRandomTetromino]);

    // Controls
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!gameRunning) return;

            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    movePiece(-1, 0);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    movePiece(1, 0);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    movePiece(0, 1);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    rotateCurrent();
                    break;
                case ' ':
                    e.preventDefault();
                    hardDrop();
                    break;
                case 'p':
                    e.preventDefault();
                    setGameState(prev => ({ ...prev, paused: !prev.paused }));
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameRunning, movePiece, rotateCurrent, hardDrop]);

    // Game loop
    useEffect(() => {
        if (!gameRunning || gameState.gameOver || gameState.paused) return;

        const interval = setInterval(() => {
            const now = Date.now();
            if (now - lastDrop >= dropTime) {
                dropPiece();
                setLastDrop(now);
            }
        }, 50);

        return () => clearInterval(interval);
    }, [gameRunning, gameState.gameOver, gameState.paused, dropTime, lastDrop, dropPiece]);

    // Update drop time based on level
    useEffect(() => {
        setDropTime(Math.max(50, 1000 - (gameState.level - 1) * 100));
    }, [gameState.level]);

    // Rendering
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw board
        for (let y = 0; y < BOARD_HEIGHT; y++) {
            for (let x = 0; x < BOARD_WIDTH; x++) {
                const cell = gameState.board[y][x];
                if (cell) {
                    ctx.fillStyle = TETROMINOS[cell].color;
                    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
                }
            }
        }

        // Draw current piece
        if (gameState.currentPiece) {
            ctx.fillStyle = gameState.currentPiece.color;
            for (let y = 0; y < gameState.currentPiece.shape.length; y++) {
                for (let x = 0; x < gameState.currentPiece.shape[y].length; x++) {
                    if (gameState.currentPiece.shape[y][x]) {
                        const drawX = (gameState.currentPiece.x + x) * CELL_SIZE;
                        const drawY = (gameState.currentPiece.y + y) * CELL_SIZE;
                        ctx.fillRect(drawX, drawY, CELL_SIZE - 1, CELL_SIZE - 1);
                    }
                }
            }
        }

        // Draw grid
        ctx.strokeStyle = '#333333';
        ctx.lineWidth = 1;
        for (let x = 0; x <= BOARD_WIDTH; x++) {
            ctx.beginPath();
            ctx.moveTo(x * CELL_SIZE, 0);
            ctx.lineTo(x * CELL_SIZE, BOARD_HEIGHT * CELL_SIZE);
            ctx.stroke();
        }
        for (let y = 0; y <= BOARD_HEIGHT; y++) {
            ctx.beginPath();
            ctx.moveTo(0, y * CELL_SIZE);
            ctx.lineTo(BOARD_WIDTH * CELL_SIZE, y * CELL_SIZE);
            ctx.stroke();
        }

        // Game over overlay
        if (gameState.gameOver) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 20px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 20);
            ctx.font = '14px monospace';
            ctx.fillText(`Score: ${gameState.score}`, canvas.width / 2, canvas.height / 2 + 10);
        }

        // Paused overlay
        if (gameState.paused && !gameState.gameOver) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 16px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
        }

    }, [gameState]);

    const startGame = () => {
        if (gameState.gameOver) {
            initGame();
        }
        setGameRunning(true);
        setGameState(prev => ({ ...prev, paused: false }));
    };

    const pauseGame = () => {
        setGameState(prev => ({ ...prev, paused: !prev.paused }));
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsVisible(!isVisible)}
                className="mb-2 px-3 py-1 bg-purple-600/50 border border-purple-500 rounded text-white hover:bg-purple-600 transition-colors text-xs font-mono flex items-center gap-1"
            >
                <Square size={12} />
                Tetris
            </button>

            {isVisible && (
                <div className="bg-zinc-900/95 border border-zinc-700 rounded-lg p-4 backdrop-blur-sm">
                    <div className="mb-3 text-center">
                        <h3 className="text-sm font-bold text-white mb-1 flex items-center justify-center gap-1">
                            <Square className="w-4 h-4 text-purple-400" />
                            Tetris
                        </h3>
                        <p className="text-xs text-zinc-400">Classic block puzzle game</p>
                    </div>

                    <div className="flex gap-4">
                        {/* Game Board */}
                        <canvas
                            ref={canvasRef}
                            width={BOARD_WIDTH * CELL_SIZE}
                            height={BOARD_HEIGHT * CELL_SIZE}
                            className="border border-zinc-600 rounded bg-black"
                        />

                        {/* Side Panel */}
                        <div className="flex flex-col gap-3 min-w-[120px]">
                            {/* Next Piece */}
                            <div className="bg-black/50 border border-zinc-600 rounded p-2">
                                <div className="text-xs text-zinc-400 mb-2">NEXT</div>
                                <div className="w-16 h-16 bg-black border border-zinc-700 rounded flex items-center justify-center">
                                    {gameState.nextPiece && (
                                        <div className="grid gap-px" style={{
                                            gridTemplateColumns: `repeat(${gameState.nextPiece.shape[0].length}, 6px)`,
                                            gridTemplateRows: `repeat(${gameState.nextPiece.shape.length}, 6px)`
                                        }}>
                                            {gameState.nextPiece.shape.flat().map((cell, i) => (
                                                <div
                                                    key={i}
                                                    className="w-1.5 h-1.5"
                                                    style={{
                                                        backgroundColor: cell ? gameState.nextPiece!.color : 'transparent'
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="bg-black/50 border border-zinc-600 rounded p-2 text-xs">
                                <div className="text-zinc-400 mb-1">SCORE</div>
                                <div className="text-white font-mono">{gameState.score.toLocaleString()}</div>

                                <div className="text-zinc-400 mb-1 mt-2">LINES</div>
                                <div className="text-white font-mono">{gameState.lines}</div>

                                <div className="text-zinc-400 mb-1 mt-2">LEVEL</div>
                                <div className="text-white font-mono">{gameState.level}</div>
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex gap-2 mt-3">
                        <button
                            onClick={() => {
                                if (!gameRunning || gameState.gameOver) {
                                    initGame();
                                    startGame();
                                } else {
                                    pauseGame();
                                }
                            }}
                            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm transition-colors"
                        >
                            {gameRunning && !gameState.paused && !gameState.gameOver ? (
                                <>
                                    <Pause size={12} />
                                    Pause
                                </>
                            ) : (
                                <>
                                    <Play size={12} />
                                    {gameState.gameOver ? 'Restart' : 'Start'}
                                </>
                            )}
                        </button>
                        <button
                            onClick={initGame}
                            className="px-3 py-2 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 rounded text-sm transition-colors"
                        >
                            <RotateCcw size={12} />
                        </button>
                    </div>

                    <div className="text-xs text-zinc-400 space-y-1 mt-2">
                        <div><strong>Arrow Keys:</strong> Move & Rotate</div>
                        <div><strong>Space:</strong> Hard Drop • <strong>P:</strong> Pause</div>
                    </div>
                </div>
            )}
        </div>
    );
}