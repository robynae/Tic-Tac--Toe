const gameBoard = (function () {
    let rows = 3;
    let columns = 3;
    let board = [];

    const makeBoard = function () {
        for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(boxes)
        }
    }
    console.log(board);
}
return {makeBoard};
})();

const boxes = (function () {
  value = ''

  const changeBoxValue = function(player) {
    value = player
  }

  const getValue = () => value;
  return {changeBoxValue, getValue}
})();

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
})();

