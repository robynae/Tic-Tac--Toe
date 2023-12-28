const gameBoard = (function() {
    let rows = 3;
    let columns = 3;
    let board = [];

        for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(gameCells());
        }
    }


    const getBoard = () => board;

    const changeCell = function(row, column, player) {
      const cell = board[row][column]
      if(cell.getValue() === '') {
        cell.changeMarker(player);
        return true;
      } else if(cell.getValue() === 'X' || 'O') {
        return false;
      }
    }


    const printBoard = () => {
      const boardWithValues = board.map((row) => row.map((cell) => cell.getValue()));
      console.log(boardWithValues);
    }

return {getBoard, changeCell, printBoard};
})();

function gameCells() {
  let value = '';

  const changeMarker = function(player) {
    value = player;
  }

  const getValue = () => value;
  return {changeMarker, getValue};
};

const gameController = (function() {
  const board = gameBoard;
  const players = [
    {
    name: 'Player One',
    marker: 'X'
    },
    {
      name: 'Player Two',
      marker: 'O'
    }
];

let currentPlayer = players[0];

const getCurrentPlayer = () => currentPlayer.marker;

const switchCurrentPlayer = function() {
  if(currentPlayer === players[0]) {
    currentPlayer = players[1];
  } else {
    currentPlayer = players[0];
  }
}

const newRound = function() {
  board.printBoard();
  console.log(`${currentPlayer.name}'s turn.`);
}

const checkHorizontalWin = function(arr) {
  for(let i =0; i < arr.length; i++) {
    const column = arr[i];
    if(column.every((cell) => cell.getValue() === 'X' || cell.getValue() === 'O')) {
      return true;
    }
  }
  return false;
  }

const checkVerticalWin = function(arr) {
  for(let i = 0; i < arr.length; i++) {
    let column = [];
    for(let j = 0; j < arr[i].length; j++) {
      column.push(arr[j][i].getValue());
    }
      if(column.every((cell) => cell === 'X' || cell === 'O')) {
        return true;
    }
  }
  return false;
}


const checkIfWon = function() {
  if(checkHorizontalWin(board.getBoard()) === true || checkVerticalWin(board.getBoard()) === true) {
    console.log(`${currentPlayer.name} wins!`)
  }
}

const playRound = function(column, row) {
  if(board.changeCell(column, row, getCurrentPlayer())) {
      checkIfWon();
      switchCurrentPlayer();
      newRound();
  } else {
    console.log('Sorry, this cell is taken. Try again.')
  }
}

newRound();



return {getCurrentPlayer, switchCurrentPlayer, playRound};
})();


