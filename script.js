let board = ['', '', '',
             '', '', '',        
             '', '', ''];

function createPlayer(symbol) {
    return {
        symbol,
        makeMove(i) {
            if (board[i] === '') {
                board[i] = this.symbol;
                console.log(`Player ${this.symbol} made a move at position ${i}`);
            } else {
                console.log(`Position ${i} is already taken. Player ${this.symbol} cannot make a move.`);
            }
        } 
    }
}

class Game {
    constructor(playerOne, playerTwo) {
        this.playerOne = createPlayer('X');
        this.playerTwo = createPlayer('O');
        this.currentPlayer = this.playerOne;
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === this.playerOne ? this.playerTwo : this.playerOne //ternary operator?
    }

    checkWinner(lastMoveIndex) {
        const win = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [6, 4, 2]             // Diagonals
        ];

        const affectedCombinations = win.filter(combination => combination.includes(lastMoveIndex));

        for (let i = 0; i < affectedCombinations.length; i++) {
            const [a, b, c] = affectedCombinations[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                console.log(`Player ${board[a]} wins!`);
                return null; // End the game
            }
        }

        if (!board.includes('')) {
            console.log("It's a draw!");
            return null; // End the game
        }

        return true; // Continue the game
    }

    makeMove(i) {
        if (board[i] === '') {
            board[i] = this.currentPlayer.symbol;
            console.log(`Player ${this.currentPlayer.symbol} made a move at position ${i}`);
            console.log(board);
            this.switchPlayer();
        } else {
            console.log(`Position ${i} is already taken. Player ${this.currentPlayer.symbol} cannot make a move here.`);
            this.makeMove(i); // Retry the move
        }
        
        return this.checkWinner(i); // check for winner after each move
    }
    
}
