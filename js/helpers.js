export const BOARDCOLS = 7;
export const BOARDROWS = 6;
export const turnIndicator = document.getElementById('turn-indicator');

/**
 * Gets the HTML element for a slot located at (col, row)
 * @param {number} col Column of the slot
 * @param {number} row Row of the slot
 * @returns {HTMLElement}
 */

export function getSlotElement(col, row) {
  return document.getElementById(`slot${col}${row}`);
}