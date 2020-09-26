const CODES = {
  A: 65,
  Z: 90
};

function createCell() {
  return `
    <div class="cell" contenteditable></div>
  `;
}

function createCol(col) {
  return `
    <div class="column">${col}</div>
  `;
}

function createRow(cols, index = '') {
  return `
    <div class="row">
      <div class="row__info">${index}</div>
      <div class="row__data">${cols}</div>
    </div>
  `;
}

function createChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
      .fill('')
      .map(createChar)
      .map(createCol)
      .join('');

  const cells = new Array(colsCount)
      .fill('')
      .map(createCell)
      .join('');

  rows.push(createRow(cols));

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(cells, i + 1));
  }

  return rows.join('');
}
