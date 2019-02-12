/*----- constants -----*/
const BOARDCOLS = 7;
const BOARDROWS = 6;

/*----- app's state (variables) -----*/
let boardHTML = '';
let p1Turn = true;

/*----- cached element references -----*/
const board = document.getElementById('board');
const playerColor = document.getElementById('player-indicator');

/*----- functions -----*/
//generate gameboard
for (let row = BOARDROWS - 1; row >= 0; row--) {
  for (let col = 0; col < BOARDCOLS; col++) {
    boardHTML += 
    `<div class="slot"> 
      <label for="slot${col}${row}">
        <input onchange="runTurn(this)" 
        ${row > 0 ? 'disabled' : '' } 
        type="checkbox" 
        name="slot${col}${row}" 
        id="slot${col}${row}" 
        data-col="${col}"
        data-row="${row}" >
      </label>
    </div>`
  }
}
board.innerHTML = boardHTML;

function runTurn(input) {
  const {col, row} = input.dataset;
  //change color of label
  input.parentElement.className = p1Turn ? 'p1' : 'p2';
  const isWin = checkWin(parseInt(col), parseInt(row), p1Turn ? 'p1' : 'p2');
  if (isWin) {
    alert('winner')
    return;
  };
  
  //change who's turn
  p1Turn = !p1Turn;
  
  //update player indicator text
  if (p1Turn) {
    playerColor.innerText = 'Player 1';
    playerColor.className = 'p1';
  } else {
    playerColor.innerText = 'Player 2';
    playerColor.className = 'p2';
  }  
  //change what's disabled
  input.disabled = true;
  if (row < BOARDROWS - 1) {
    const neighbor = document.getElementById(`slot${col}${parseInt(row) + 1}`)
    neighbor.disabled = false;
  }
}

  // check if it's a win
  const isWin = checkWin(parseInt(col), parseInt(row), player1Turn ? 'player1' : 'player2');
  if (isWin) {
    // update win text
    const turnIndicator = document.getElementById('turn-indicator');
    const player = player1Turn ? 'player1' : 'player2';
    turnIndicator.innerHTML = `🎉 <span class="${player}" id="player-indicator">Player 1</span> wins 🎉`;

    // get all checkboxs
    const checkboxes = document.querySelectorAll('.slot input[type=checkbox]');
    // and disable all of them
    checkboxes.forEach(checkbox => {
      checkbox.disabled = true;
    });

    return;
  }

function checkWin(col, row, currPlayer) {
//check down, across, diagonal 
  return (checkDown(col, row, currPlayer)) 
    || 
    (checkAcross(col, row, currPlayer))
    ||
    (checkDiagonal(col, row, currPlayer))
}

function checkDown(col, row, currPlayer) {
  if (row < 3) return false; 
  for (let j = row - 1; j > row - 4; j--) {
    const currSlot = document.getElementById(`slot${col}${j}`).parentElement.className;
    if (currSlot !== currPlayer) return false;
  }
  return true;
}

function checkAcross(col, row, currPlayer) {
  let sameColorNeighbors = 0;
  //check to right
  for (let i = col + 1; i < col + 4; i++) {
    if (i >= BOARDCOLS) break;
    const currSlot = document.getElementById(`slot${i}${row}`).parentElement.className;
    if (currSlot === currPlayer) 
      sameColorNeighbors += 1;
    else break;
  }
  //check to left
  for (let i = col - 1; i > col - 4; i--) {
    if (i < 0) break;
    const currSlot = document.getElementById(`slot${i}${row}`).parentElement.className;
    if (currSlot === currPlayer) 
      sameColorNeighbors += 1;
    else break;
  }
  return sameColorNeighbors >= 3;
}

function checkDiagonal(col, row, currPlayer) {
  return checkUpLeft(col, row, currPlayer) || checkUpRight(col, row, currPlayer) 
}

function checkUpRight(col, row, currPlayer) {
  let sameColorNeighbors = 0;
  // search up right
  for (let i = 1; i < 4; i++) {
    // break if out of bounds
    if (col + i >= BOARDCOLS || row + i >= BOARDROWS) break;
    const currSlotPlayer = document.getElementById(`slot${col + i}${row + i}`).parentElement.className;
    if (currSlotPlayer === currPlayer) sameColorNeighbors += 1;
    else break;
  }
  // search down left
  for (let i = 1; i < 4; i++) {
    // break if out of bounds
    if (col - i < 0 || row - i < 0) break;
    const currSlotPlayer = document.getElementById(`slot${col - i}${row - i}`).parentElement.className;
    if (currSlotPlayer === currPlayer) sameColorNeighbors += 1;
    else break;
  }
  return sameColorNeighbors >= 3;
}

function checkUpLeft(col, row, currPlayer) {
  let sameColorNeighbors = 0;
  // search up left
  for (let i = 1; i < 4; i++) {
    // break if out of bounds
    if (col - i < 0 || row + i >= BOARDROWS) break;
    const currSlotPlayer = document.getElementById(`slot${col - i}${row + i}`).parentElement.className;
    if (currSlotPlayer === currPlayer) sameColorNeighbors += 1;
    else break;
  }
  // search down right
  for (let i = 1; i < 4; i++) {
    // break if out of bounds
    if (col + i >= BOARDCOLS || row - i < 0) break;
    const currSlotPlayer = document.getElementById(`slot${col + i}${row - i}`).parentElement.className;
    if (currSlotPlayer === currPlayer) sameColorNeighbors += 1;
    else break;
  }
  return sameColorNeighbors >= 3;
}


