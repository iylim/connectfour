import { getSlotElement, BOARDCOLS, BOARDROWS } from './helpers.js';

/**
 *  Checks if there is a connect four in any direction (down, across, diagonal)
 * @param {number} col Column of the slot to start checking at
 * @param {number} row Row of the slot to start checking at
 * @param {string} currPlayer Current player's class
 */

export function checkWin(col, row, currPlayer) {
  return checkDown(col, row, currPlayer) || checkAcross(col, row, currPlayer) || checkDiagonal(col, row, currPlayer);
}

function checkDown(col, row, currPlayer) {
  if (row < 3) return false; 
  // can't connect 4 if it's only stacked 3 or less

  for (let j = row - 1; j > row - 4; j--) {
    const currSlotPlayer = getSlotElement(col, j).parentElement.className;
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
    const currSlotPlayer = getSlotElement(i, row).parentElement.className;
    if (currSlotPlayer === currPlayer) sameColorNeighbors += 1;
    else break;
  }
  // check to the left
  for (let i = col - 1; i > col - 4; i--) {
    // break if out of bounds
    if (i < 0) break;
    const currSlotPlayer = getSlotElement(i, row).parentElement.className;
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
    const currSlotPlayer = getSlotElement(col + i, row + i).parentElement.className;
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

export function checkUpLeft(col, row, currPlayer) {
  let sameColorNeighbors = 0;
  // search up left
  for (let i = 1; i < 4; i++) {
    // break if out of bounds
    if (col - i < 0 || row + i >= BOARDROWS) break;
    const currSlotPlayer = getSlotElement(col - i,row + i).parentElement.className;
    if (currSlotPlayer === currPlayer) sameColorNeighbors += 1;
    else break;
  }
  // search down right
  for (let i = 1; i < 4; i++) {
    // break if out of bounds
    if (col + i >= BOARDCOLS || row - i < 0) break;
    const currSlotPlayer = getSlotElement(col + i, row - i).parentElement.className;
    if (currSlotPlayer === currPlayer) sameColorNeighbors += 1;
    else break;
  }
  return sameColorNeighbors >= 3;
}
