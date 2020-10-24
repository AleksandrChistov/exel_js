import {range} from '@core/utils';

export function shouldResize(event) {
  return event.target.dataset.resize;
}

export function isCell(event) {
  return event.target.dataset.type === 'cell';
}

export function keyMatches(event) {
  const keys = [
    'ArrowRight',
    'ArrowLeft',
    'ArrowDown',
    'ArrowUp',
    'Enter',
    'Tab'
  ];
  return keys.includes(event.code);
}

export function matrix($current, $target) {
  const current = $current.id(true);
  const target = $target.id(true);

  const cols = range(current.col, target.col);
  const rows = range(current.row, target.row);

  const ids = cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`));
    return acc;
  }, []);

  return ids;
}

export function nextSelector(code, {row, col}) {
  const MIN_VALUE = 0;
  const MAX_VALUE = 25;

  switch (code) {
    case 'ArrowRight':
    case 'Tab':
      col = col + 1 > MAX_VALUE ? MAX_VALUE : col + 1;
      break;
    case 'ArrowDown':
    case 'Enter':
      row++;
      break;
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1;
      break;
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1;
      break;
  }

  return `[data-id="${row}:${col}"]`;
}
