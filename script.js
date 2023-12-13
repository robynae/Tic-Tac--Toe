const createBoard = (function () {
    let rows = 3;
    let columns = 3;
    let board = [];

    const makeBoard = function () {
        for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(boxes.value)
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

