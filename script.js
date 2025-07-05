// Removed global board variable. It will now be encapsulated within the Game class.

function createPlayer(symbol) {  // Factory function to create a player object with a symbol (X or O) and a method to make moves
    return {
        symbol: symbol, // Assign the player's symbol (X or O) to the player object
        makeMove(i) {
            if (this.gameOver) {
                console.log("The game is over. No more moves can be made.");
                return;
            }

            if (this.board[i] === '') {
                this.board[i] = this.symbol;
                console.log(`Player ${this.symbol} made a move at position ${i}`);
            } else {
                console.log(`Position ${i} is already taken. Player ${this.symbol} cannot make a move.`);
                this.gameOver = false; // Track if the game is over
            }
        }
    }
}

class Game {  // Class to manage the game state, including players, moves, board updates, and determining the winner or draw
    constructor(playerOne, playerTwo) {
        this.board = ['', '', '', '', '', '', '', '', '']; // Encapsulated board within the Game class
        this.playerX = createPlayer(playerOne);
        this.playerO = createPlayer(playerTwo);
        this.currentPlayer = this.playerX; // start with player X
    }

    switchPlayer() {
        if (this.currentPlayer === this.playerX) {
            this.currentPlayer = this.playerO; // Switch to player O
        } else {
            this.currentPlayer = this.playerX; // Switch to player X
        }
    }

    checkWinner(lastMoveIndex) { // function to check if there is a winner after each move with board index i
        const win = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [6, 4, 2]             // Diagonals
        ];                                      // all possible combinations to win

        const board = this.board; // Use the encapsulated board property
        const affectedCombinations = win.filter(combination => combination.includes(lastMoveIndex));

        for (let i = 0; i < affectedCombinations.length; i++) {
            const [a, b, c] = affectedCombinations[i]; // Destructuring to get the values of a, b, c from the combination

            // Check for a winner
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                console.log(`Player ${board[a]} wins!`);
                this.gameOver = true; // End the game
                return board[a]; // Return the winner's symbol
            }
        }

        // Check for a draw if no winner exists
        if (!board.includes('')) {
            console.log("It's a draw!");
            this.gameOver = true; // End the game
            return null;
        }

        // Continue the game if no winner or draw
        return true;
    }

    makeMove(i) {
        if (this.board[i] === '') {
            this.board[i] = this.currentPlayer.symbol; // Make the move
            console.log(`Player ${this.currentPlayer.symbol} made a move at position ${i}`);
            console.log(this.board);

            // Check for a winner or draw after the move
            const result = this.checkWinner(i);
            if (result) {
                return result; // End the game if there's a winner or draw
            }

            this.switchPlayer(); // Switch to the next player
        } else {
            console.log(`Position ${i} is already taken. Player ${this.currentPlayer.symbol} cannot make a move here.`);
            console.log(`Please choose a different position.`);
        }
    }

    resetGame() {
        this.board = ['', '', '', '', '', '', '', '', '']; // Reset the board
        this.currentPlayer = this.playerX; // Reset to player X
        console.log("Game has been reset.");
    }
}

let game = new Game();
