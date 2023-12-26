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
      if(cell.getValue === '') {
        cell.changeMarker(player);
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

const currentPlayer = players[0];

const switchActivePlayer = function() {
  if(currentPlayer === players[0]) {
    currentPlayer = player[1];
  } else {
    currentPlayer = players[0];
  }
}

return {currentPlayer};
})();



