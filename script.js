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

  const fillBox = function(box, player) {

  }
  return {value}
})();

