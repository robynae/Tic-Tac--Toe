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
      } else if(cell.getValue() === 'X' || cell.getValue() === 'O') {
        return false;
      }
    }


    const printBoard = () => {
      const boardWithValues = board.map((row) => row.map((cell) => cell.getValue()));
      console.log(boardWithValues);
    }

    const resetBoard = () => {
      board.forEach((row) => {
        row.forEach((cell) => {
          cell.changeMarker('');
        });
      });
      gameController.resetCurrentPlayer();
    };

return {getBoard, changeCell, printBoard, resetBoard};
})();

function gameCells() {
  let value = '';

  const changeMarker = function(player) {
    value = player;
  }

  const getValue = () => value;
  return {changeMarker, getValue};
};

const addToDom = (function() {
  const board = gameBoard.getBoard();
  const domBoard = document.querySelector('.board')
  const resetBtn = document.querySelector('.reset')
  
  board.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      const newCell = document.createElement('div');
      newCell.classList.add('cell');
      newCell.textContent = cell.getValue();
      newCell.dataset.row = rowIndex;
      newCell.dataset.col = cellIndex;
      domBoard.appendChild(newCell);

      newCell.addEventListener('mouseover', setHover);
      newCell.addEventListener('mouseout', stopHover);
      newCell.addEventListener('click', handleClick);
    })
  })

  function setHover(e) {
    const cell = e.target;
    if(cell.textContent === ''){
    cell.classList.add('hover');
    cell.textContent = gameController.getCurrentPlayer();
    }
  }

  function stopHover(e) {
    const cell = e.target;
    const row = parseInt(cell.dataset.row, 10);
    const col = parseInt(cell.dataset.col, 10);
    const initialValue = board[row][col].getValue();
    cell.classList.remove('hover');
    if(initialValue === '') {
      cell.textContent = '';
    }
  }
  
  function handleClick(e) {
    const cell = e.target;
    const row = parseInt(cell.dataset.row, 10);
    const col = parseInt(cell.dataset.col, 10);
    cell.classList.remove('hover');
    gameController.playRound(row, col);
  }

  function setMessage(message) {
    const myMessage = document.querySelector('.message');
    myMessage.textContent = message;
  }

  resetBtn.addEventListener('click', function () {
    gameBoard.resetBoard();
    updateDOM();
  });
  
  function updateDOM() {
    const cells = document.querySelectorAll('.cell');
  
    cells.forEach((cell, index) => {
      const row = Math.floor(index / 3);
      const col = index % 3;
      cell.textContent = board[row][col].getValue();
    });
    setMessage(`X's turn.`)
  }

  return {setMessage}
})();


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

const resetCurrentPlayer = () => {
  currentPlayer = players[0];
}

const newRound = function() {
  board.printBoard();
  addToDom.setMessage(`${getCurrentPlayer()}'s turn.`)
}

const checkHorizontalWin = function(arr) {
  for(let i =0; i < arr.length; i++) {
    const column = arr[i];
    if(column.every((cell) => cell.getValue() === 'X' || column.every((cell) => cell.getValue() === 'O'))) {
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
      if(column.every((cell) => cell === 'X' || column.every((cell) => cell === 'O'))) {
        return true;
    }
  }
  return false;
}

const checkDiagonalWin = function(arr) {
  const diagOne = [arr[0][0].getValue(), arr[1][1].getValue(),arr[2][2].getValue()];
  const diagTwo = [arr[0][2].getValue(), arr[1][1].getValue(), arr[2][0].getValue()];
  if(diagOne.every((cell) => cell === 'X' || diagOne.every((cell) => cell === 'O')) || diagTwo.every((cell) => cell === 'X' || diagTwo.every((cell) => cell === 'O'))) {
    return true;
  }
  return false;
}

const checkDraw = function() {
  const myBoard = board.getBoard().flat().map(cell => cell.getValue());
  if(myBoard.every((cell) => cell === 'X' || cell === 'O')) {
    if(checkIfWon() !== true){
    console.log("It's a draw!");
    board.printBoard();
    addToDom.setMessage("It's a draw!")
    return true;
    }
  }
  return false;
}

const checkIfWon = function() {
  if(checkHorizontalWin(board.getBoard()) === true || checkVerticalWin(board.getBoard()) === true || checkDiagonalWin(board.getBoard()) === true) {
    console.log(`${currentPlayer.name} wins!`)
    board.printBoard();
    addToDom.setMessage(`${getCurrentPlayer()} wins!`)
    return true;
  } 
}

const playRound = function(column, row) {
  if(board.changeCell(column, row, getCurrentPlayer())) {
      if(!checkIfWon() && !checkDraw()) {
      switchCurrentPlayer();
      newRound();
      }
  } else {
    console.log('Sorry, this cell is taken. Try again.')
  }
}

newRound();



return {getCurrentPlayer, switchCurrentPlayer, playRound, resetCurrentPlayer};
})();

