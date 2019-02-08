const board = document.getElementById('board');
const playerColor = document.getElementById('player-indicator');
let boardHTML = '';
let p1Turn = true;
const BOARDCOLS = 7;
const BOARDROWS = 6;
const {col, row} = input.dataset;

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

function runTurn(input) {
  //change color of label
  input.parentElement.className = p1Turn ? 'p1' : 'p2';
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

board.innerHTML = boardHTML;
