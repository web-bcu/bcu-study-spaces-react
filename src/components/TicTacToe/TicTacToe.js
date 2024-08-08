import React, { useEffect, useState, Fragment } from 'react';
import './tictactoe.css';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function TicTacToe() {
    const [board, setBoard] = useState(
        new Array(6).fill(null).map(() => new Array(6).fill(""))
    );
    const [player, setPlayer] = useState("X");
    const [status, setStatus] = useState("Game continues");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        if (player === "O" && status === "Game continues") {
            makeAIMove();
        }
    }, [player, status]);

    useEffect(() => {
        checkGameStatus();
    }, [board]);

    const makeAIMove = async () => {
        setLoading(true);
        try {
            const {data} = await axios.post("/gemini/tictactoe", {board: board})
            if (data.row !== undefined && data.col !== undefined) {
                board[data.row][data.col] = 'O';
                setBoard([...board]);
                setPlayer('X');
            }
        } catch (error) {
            console.error("Error making AI move:", error);
        } finally {
            setLoading(false);
        }
    };

    const checkGameStatus = () => {
        const checkWinner = (player) => {
            // Check rows, columns, and diagonals for 5 in a row
            for (let i = 0; i < 6; i++) {
                for (let j = 0; j < 2; j++) {
                    if (
                        board[i][j] === player &&
                        board[i][j + 1] === player &&
                        board[i][j + 2] === player &&
                        board[i][j + 3] === player &&
                        board[i][j + 4] === player
                    ) {
                        return true;
                    }
                }
            }

            for (let j = 0; j < 6; j++) {
                for (let i = 0; i < 2; i++) {
                    if (
                        board[i][j] === player &&
                        board[i + 1][j] === player &&
                        board[i + 2][j] === player &&
                        board[i + 3][j] === player &&
                        board[i + 4][j] === player
                    ) {
                        return true;
                    }
                }
            }

            for (let i = 0; i < 2; i++) {
                for (let j = 0; j < 2; j++) {
                    if (
                        board[i][j] === player &&
                        board[i + 1][j + 1] === player &&
                        board[i + 2][j + 2] === player &&
                        board[i + 3][j + 3] === player &&
                        board[i + 4][j + 4] === player
                    ) {
                        return true;
                    }
                }
            }

            for (let i = 4; i < 6; i++) {
                for (let j = 0; j < 2; j++) {
                    if (
                        board[i][j] === player &&
                        board[i - 1][j + 1] === player &&
                        board[i - 2][j + 2] === player &&
                        board[i - 3][j + 3] === player &&
                        board[i - 4][j + 4] === player
                    ) {
                        return true;
                    }
                }
            }
            return false;
        };

        if (checkWinner("X")) {
            setStatus("X wins");
            return;
        }

        if (checkWinner("O")) {
            setStatus("O wins");
            return;
        }

        // Check for a tie
        let isBoardFull = true;
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
                if (board[i][j] === "") {
                    isBoardFull = false;
                    break;
                }
            }
        }

        if (isBoardFull) {
            setStatus("It's a tie");
            return;
        }

        setStatus("Game continues");
    };

    const handleCellClick = (row, col) => {
        if (board[row][col] === "" && player === "X" && status === "Game continues" && !loading) {
            board[row][col] = "X";
            setBoard([...board]);
            setPlayer("O");
        }
    };

    const renderCell = (row, col) => {
        return (
            <button
                key={`${row}-${col}`}
                className="custom-button"
                disabled={loading || status !== 'Game continues'}
                onClick={() => handleCellClick(row, col)}
            >
                {board[row][col]}
            </button>
        );
    };

    const restart = () => {
        setBoard(new Array(6).fill(null).map(() => new Array(6).fill("")))
        setPlayer('X');
        setStatus("Game continues")
    }

    function goBack() {
        navigate(-1)
    }

    return (
        <div className="tictactoe relative">
            <div className='absolute top-4 left-4'>
                <Button title="Go Back" btnClass="btn-primary text-white" onClick={goBack}/>
            </div>
            <h1 className="title">Tic Tac Toe</h1>
            <div className="board-tic-tac-toe">
                {board.map((row, i) => (
                    <div className="row" key={i}>
                        {row.map((_, j) => (
                            <Fragment key={j}>{renderCell(i, j)}</Fragment>
                        ))}
                    </div>
                ))}
            </div>
            <div className={status === "Game continues" ? "status" : "status-win"}>
                {status}
            </div>
            {status !== "Game continues" && <Button title="Start over" btnClass="btn-success text-white" onClick={() => restart()}/>}
        </div>
    );
}
