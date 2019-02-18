import { checkWin } from './win-logic.js';
import { getSlotElement, BOARDROWS, turnIndicator } from './helpers.js';
import gameState from './gamestate.js';


/**
 * changes label, disables it, enables neighbors, check if win, change players, change text
 * @param {Event} get event object set to input
 */

export function runTurn(event) {
  const input = event.target;
  const player = gameState.getPlayer1Turn() ? 'player1' : 'player2';

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
    const neighbor = getSlotElement(col, parseInt(row) + 1);
    neighbor.disabled = false;
  }

  // check if it's a win
  const isWin = checkWin(col, row, player);
  if (isWin) {
    // update win text
    const winnerText = gameState.getPlayer1Turn() ? 'Player 1 Wins!' : 'Player 2 Wins!';
    turnIndicator.innerHTML = `🎉 <span class="${player}" id="player-indicator"> ${winnerText} </span> 🎉`;

    // get all checkboxes
    const checkboxes = document.querySelectorAll('.slot input[type=checkbox]');
    // and disable all of them
    checkboxes.forEach(checkbox => {
      checkbox.disabled = true;
    });
    return;
  }

  // change whose turn it is
  gameState.switchTurns();

  // update player-indicator text
  const playerIndicator = document.getElementById('player-indicator');
  if (gameState.getPlayer1Turn()) {
    playerIndicator.innerText = 'Player 1';
    playerIndicator.className = 'player1';
  } else {
    playerIndicator.innerText = 'Player 2';
    playerIndicator.className = 'player2';
  }
}