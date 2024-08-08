import './sudoku.css';
import { useState } from 'react';
import cellData from '../../data/cellData';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';


export default function SudokuSolver() {
    const [sudokuArr, setSudokuArr] = useState(cellData);
    const navigate = useNavigate();

    function getDeepCopy(arr) {
        return JSON.parse(JSON.stringify(arr))
    }

    function onInputChange(e, row, col) {
        var val = parseInt(e.target.value) || -1, grid = getDeepCopy(sudokuArr);

        if (val === -1 || (val >= 1 && val <= 9)) {
            grid[row][col] = val;
        }
        setSudokuArr(grid)
    }

    // function to compare sudoku's 
    function compareSudokus(currentSudoku, solvedSudoku) {
        let res = {
            isCompleted: true,
            isSolvable: true,
        }
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (currentSudoku[i][j] !== solvedSudoku[i][j]) {
                    if (currentSudoku[i][j] !== -1) {
                        res.isSolvable = false;
                    }
                    res.isCompleted = false;
                }
            }
        }
        return res;
    }

    // function to check sudoku is valid or not
    function checkSudoku() {
        let sudoku = getDeepCopy(cellData);
        solver(sudoku);
        let compare = compareSudokus(sudokuArr, sudoku);
        if (compare.isCompleted) {
            toast.success("Congratulations! You have solved Sudoku!");
        } else if (compare.isSolvable) {
            toast.warning("Keep going!")
        } else {
            toast.error("Sudoku can't be solved. Try again!")
        }
    }

    function checkRow(grid, row, num) {
        return grid[row].indexOf(num) === -1 // Chưa có số đó trong hàng
    }

    // check num is unique in col
    function checkCol(grid, col, num) {
        return grid.map(row => row[col]).indexOf(num) === -1; // Chưa có số đó trong cột
    }

    // chekc num is unique in box
    function checkBox(grid, row, col, num) {
        let boxArr = [], rowStart = row - (row % 3), colStart = col - (col % 3)
        for (let i = 0; i < 3; i++) {
            for (let j = 3; j < 3; j++) {
                // get all the cell numbers and push to boxArr
                boxArr.push(grid[rowStart + i][colStart + j]);
            }
        }
        return boxArr.indexOf(num) === -1; // Chưa có số đó trong bảng
    }

    function checkValid(grid, row, col, num) {
        // num should be unique in row, col and in the square 3x3
        if (checkRow(grid, row, num) && checkCol(grid, col, num) && checkBox(grid, row, col, num)) {
            return true;
        }
        return false
    }

    function getNext(row, col) {
        // if col reaches 8, increase row number
        // if row reaches 8 and col reaches 8, next will be [0, 0]
        // if col doesn't reach 8, increase col number
        return col !== 8 ? [row, col + 1] : row !== 8 ? [row + 1, 0] : [0, 0];
    }

    // recursive function to solve sudoku
    function solver(grid, row = 0, col = 0) {

        // if the current cell is already filled, move to the next cell
        if (grid[row][col] !== -1) {
            // for last cell, don't solve it
            let isLast = row >= 8 && col >= 8;
            if (!isLast) {
                let [newRow, newCol] = getNext(row, col);
                return solver(grid, newRow, newCol);
            }
        }
        for (let num = 1; num <= 9; num++) {
            // check if this num is satisfying sudoku constraints
            if (checkValid(grid, row, col, num)) {
                // fill the num in that cell
                grid[row][col] = num;
                // get Next cell and repeat the function
                let [newRow, newCol] = getNext(row, col);

                if (!newRow && !newCol) {
                    return true;
                }

                if (solver(grid, newRow, newCol)) {
                    return true;
                }
            }
        }

        // if its in valid fill with -1
        grid[row][col] = -1;
        return false;
    }

    // function to solve sudoku by navigating to each cell
    function solveSudoku() {
        let sudoku = getDeepCopy(cellData);
        solver(sudoku);
        setSudokuArr(sudoku)
    }

    // function to reset sudoku
    function resetSudoku() {
        let sudoku = getDeepCopy(cellData)
        setSudokuArr(sudoku);
    }

    function goBack() {
        navigate(-1)
    }

    return (
        <div className="sudoku relative">
            <div className='absolute top-4 left-4'>
                <Button title="Go Back" btnClass="btn-primary text-white" onClick={goBack}/>
            </div>
            <div className="sudoku-header">
                <h3 className='text-white text-6xl mb-10'>Sudoku solver</h3>
                <table>
                    <tbody>
                        {
                            [0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rIndex) => {
                                return (
                                    <tr key={rIndex} className={(row + 1) % 3 === 0 ? 'bBorder' : ''}>
                                        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col, cIndex) => {
                                            return (
                                                <td key={rIndex + cIndex} className={(col + 1) % 3 === 0 ? 'rBorder' : ''}>
                                                    <input
                                                        onChange={(e) => onInputChange(e, row, col)}
                                                        value={sudokuArr[row][col] === -1 ? '' : sudokuArr[row][col]}
                                                        className='cellInput'
                                                        disabled={cellData[row][col] !== -1}
                                                    />
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <div className='buttonContainer'>
                    <button className='checkButton' onClick={() => checkSudoku()}>Check</button>
                    <button className='solveButton' onClick={() => solveSudoku()}>Solve</button>
                    <button className='resetButton' onClick={() => resetSudoku()}>Reset</button>
                </div>
            </div>
        </div>
    );
}