function isSafe(board, row, col) {
    // 检查这一列
    for (let i = 0; i < row; i++) {
        if (board[i][col] === 'Q') {
            return false;
        }
    }

    // 检查左上对角线
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === 'Q') {
            return false;
        }
    }

    // 检查右上对角线
    for (let i = row, j = col; i >= 0 && j < board.length; i--, j++) {
        if (board[i][j] === 'Q') {
            return false;
        }
    }

    return true;
}

function solveNQueensUtil(board, row, solutions) {
    if (row === board.length) {
        // 将当前解法加入结果集
        solutions.push(board.map(row => row.join('')));
        return;
    }

    for (let col = 0; col < board.length; col++) {
        if (isSafe(board, row, col)) {
            board[row][col] = 'Q';
            solveNQueensUtil(board, row + 1, solutions);
            board[row][col] = '.';
        }
    }
}

function solveNQueens(n) {
    let board = Array.from({ length: n }, () => Array(n).fill('.'));
    let solutions = [];
    solveNQueensUtil(board, 0, solutions);
    return solutions;
}

function printSolutions(solutions) {
    solutions.forEach(solution => {
        console.log(solution.map(row => row).join('\n'));
        console.log('\n');
    });
}

// 解决八皇后问题并打印所有解法
const solutions = solveNQueens(8);
console.log(`共有${solutions.length}种解法:`);
printSolutions(solutions);
