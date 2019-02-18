// constant varaiables
const BOARDCOLS = 7;
const BOARDROWS = 6;
let player1Turn = true;

// dom elements
const board = document.getElementById('board');
const playerIndicator = document.getElementById('player-indicator');
const turnIndicator = document.getElementById('turn-indicator');

// event listeners
document.querySelectorAll('.slot input[type=checkbox]').forEach(input => {
  input.addEventListener('change', runTurn);
});

// setup board
function initialize() {
  let boardHTML = '';
  turnIndicator.innerHTML = `<span class="player1" id="player-indicator">Player 1</span> Turn`
  for (let row = BOARDROWS - 1; row >= 0; row--) {
    // iterate over rows, going down
    for (let col = 0; col < BOARDCOLS; col++) {
      // iterate over columns, going up
      boardHTML += `
        <div class="slot">
          <label for="slot${col}${row}">
            <input onchange="runTurn(this)" type="checkbox" ${row > 0 ? 'disabled' : ''} name="slot${col}${row}" id="slot${col}${row}" data-row="${row}" data-col="${col}" >
          </label>
        </div>
      `;
    }
  }
  // set the board's HTML
  board.innerHTML = boardHTML;
}

function runTurn(event) {
  var input = event;
  const player = player1Turn ? 'player1' : 'player2';

  // change color of label
  input.parentElement.className = player;

  // disable the input
  input.disabled = true;

  // now enable it's neighbor at (col, row + 1)
  // get the col and row of our input
  let { col, row } = input.dataset;
  // convert them into numbers
  col = parseInt(col);
  row = parseInt(row);

//  // check if input is on the top row
  if (row < BOARDROWS - 1) {
    // enable the slot at (row + 1, col)
    const neighbor = getSlotElement(col, parseInt(row) + 1); // document.getElementById(`slot${col}${parseInt(row) + 1}`);
    neighbor.disabled = false;
  }

  // check if it's a win
  const isWin = checkWin(parseInt(col), parseInt(row), player1Turn ? 'player1' : 'player2');
  if (isWin) {
    // update win text
    turnIndicator.innerHTML = `🎉 <span class="${player}" id="player-indicator">${player}</span> wins 🎉`;

    // get all checkboxs
    const checkboxes = document.querySelectorAll('.slot input[type=checkbox]');
    // and disable all of them
    checkboxes.forEach(checkbox => {
      checkbox.disabled = true;
    });
    return;
  }

  // change whose turn it is
  player1Turn = !player1Turn;

  // update player-indicator text
  if (player1Turn) {
    playerIndicator.innerText = 'Player 1';
    playerIndicator.className = 'player1';
  } else {
    playerIndicator.innerText = 'Player 2';
    playerIndicator.className = 'player2';
  }
}

function checkWin(col, row, currPlayer) {
  return checkDown(col, row, currPlayer) || checkAcross(col, row, currPlayer) || checkDiagonal(col, row, currPlayer);
}

function checkDown(col, row, currPlayer) {
  if (row < 3) return false; 
  // can't connect 4 if it's only stacked 3 or less

  for (let j = row - 1; j > row - 4; j--) {
    const currSlotPlayer = document.getElementById(`slot${col}${j}`).parentElement.className;
    if (currSlotPlayer !== currPlayer) return false;
  }
  return true;
}

function checkAcross(col, row, currPlayer) {
  let sameColorNeighbors = 0;
  // check to the right
  for (let i = col + 1; i < col + 4; i++) {
    // break if out of bounds
    if (i >= BOARDCOLS) break;
    const currSlotPlayer = document.getElementById(`slot${i}${row}`).parentElement.className;
    if (currSlotPlayer === currPlayer) sameColorNeighbors += 1;
    else break;
  }
  // check to the left
  for (let i = col - 1; i > col - 4; i--) {
    // break if out of bounds
    if (i < 0) break;
    const currSlotPlayer = document.getElementById(`slot${i}${row}`).parentElement.className;
    if (currSlotPlayer === currPlayer) sameColorNeighbors += 1;
    else break;
  }
  return sameColorNeighbors >= 3;
}

function checkDiagonal(col, row, currPlayer) {
  return checkUpLeft(col, row, currPlayer) || checkUpRight(col, row, currPlayer);
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

function getSlotElement(col, row) {
  return document.getElementById(`slot${col}${row}`);
}

function reset() {
  initialize();
  player1Turn = true;
}

initialize();