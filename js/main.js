import { runTurn } from './turn-logic.js';
import { BOARDCOLS, BOARDROWS, turnIndicator } from './helpers.js';
import gameState from './gamestate.js';

const board = document.getElementById('board');

/**
 *  Initialize game, generate & set board, add event listener to input
 */

export function initialize() {
  let boardHTML = '';
  turnIndicator.innerHTML = `<span class="player1" id="player-indicator">Player 1</span> Turn`;
  for (let row = BOARDROWS - 1; row >= 0; row--) {
    // iterate over rows, going down
    for (let col = 0; col < BOARDCOLS; col++) {
      // iterate over columns, going up
      boardHTML += `
      <div class="slot">
      <label for="slot${col}${row}">
      <input type="checkbox" ${row > 0 ? 'disabled' : ''} name="slot${col}${row}" id="slot${col}${row}" data-row="${row}" data-col="${col}" >
      </label>
      </div>
      `;
    }
  }
  // set the board's HTML
  board.innerHTML = boardHTML;
  //add event listener
  document.querySelectorAll('input').forEach(input => {
    input.addEventListener('change', runTurn);
  });
}

/**
 *  Reset game, set player1 to true
 */
export function reset() {
  initialize();
  gameState.resetPlayer();
}



// add event listeners
document.getElementById('reset').addEventListener('click', reset);

initialize();
