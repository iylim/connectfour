export function highlightColumn(event) {
  const item = event.target;
  const column = item.dataset.col;
  const itemsInColumn = document.querySelectorAll(`div[data-col="${column}"]`);
  itemsInColumn.forEach(itemInColumn => itemInColumn.style.backgroundColor = 'rgba(30, 144, 255, 0.7)');
}

export function unhighlightColumn(event) {
  const item = event.target;
  const column = item.dataset.col;
  const itemsInColumn = document.querySelectorAll(`div[data-col="${column}"]`);
  itemsInColumn.forEach(itemInColumn => itemInColumn.style.backgroundColor = 'var(--bg-color)');
}