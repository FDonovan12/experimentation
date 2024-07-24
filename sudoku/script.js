window.addEventListener('click', (event) => {});

window.addEventListener('load', () => {
    const sudoku = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9],
    ];
    console.log(sudoku);
    mainResolveSudoku(sudoku);
    console.log(count);
});
let count = 0;
function mainResolveSudoku(sudoku) {
    resolveSudoku(sudoku, 0, 0);
    console.log(sudoku);
}

function resolveSudoku(sudoku, line, column) {
    if (column >= 9) {
        line++;
        column = 0;
    }
    if (line >= 9) {
        return true;
    }
    const current = sudoku[line][column];
    if (current === 0) {
        const possibleNumbers = possibleNumber(sudoku, line, column);
        if (possibleNumbers.length === 0) {
            return false;
        }
        for (let k = 0; k < possibleNumbers.length; k++) {
            const possibleNumber = possibleNumbers[k];
            sudoku[line][column] = possibleNumber;
            console.log(line, column, sudoku[0]);
            count++;
            if (resolveSudoku(sudoku, line, column + 1)) {
                return true;
            }
        }
        sudoku[line][column] = 0;
        return false;
    } else {
        return resolveSudoku(sudoku, line, column + 1);
    }
}

function possibleNumber(sudoku, line, column) {
    tab = [];
    for (let i = 1; i <= 9; i++) {
        if (numberIsPossible(sudoku, line, column, i)) {
            tab.push(i);
        }
    }
    return tab;
}

function numberIsPossible(sudoku, line, column, number) {
    for (let i = 0; i < 9; i++) {
        const current = sudoku[i][column];
        if (current === number) {
            return false;
        }
    }
    for (let i = 0; i < 9; i++) {
        const current = sudoku[line][i];
        if (current === number) {
            return false;
        }
    }
    const currentBoxeLine = line - (line % 3);
    const currentBoxeColumn = column - (column % 3);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const current = sudoku[currentBoxeLine + i][currentBoxeColumn + j];
            if (current === number) {
                return false;
            }
        }
    }
    return true;
}
