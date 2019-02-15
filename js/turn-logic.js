import checkWin from './win-logic.js';
import { getSlotElement, BOARDROWS } from './helpers.js';

let player1Turn = true;

export default function runTurn(event) {
  const input = event.target;
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

  // check if input is on the top row
  if (row < BOARDROWS - 1) {
    // enable the slot at (row + 1, col)
    const neighbor = getSlotElement(col, parseInt(row) + 1); // document.getElementById(`slot${col}${parseInt(row) + 1}`);
    neighbor.disabled = false;
  }

  // check if it's a win
  const isWin = checkWin(col, row, player);
  if (isWin) {
    // update win text
    const turnIndicator = document.getElementById('turn-indicator');
    turnIndicator.innerHTML = `🎉 <span class="${player}" id="player-indicator">Player 1</span> wins 🎉`;

    // get all checkboxs
    const checkboxes = document.querySelectorAll('.slot input[type=checkbox]');
    // and disable all of them
    checkboxes.forEach(checkbox => {
      checkbox.disabled = true;
    });
  }

  // change whose turn it is
  player1Turn = !player1Turn;

  // update player-indicator text
  const playerIndicator = document.getElementById('player-indicator');
  if (player1Turn) {
    playerIndicator.innerText = 'Player 1';
    playerIndicator.className = 'player1';
  } else {
    playerIndicator.innerText = 'Player 2';
    playerIndicator.className = 'player2';
  }
}
