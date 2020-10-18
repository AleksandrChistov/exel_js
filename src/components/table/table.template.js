const CODES = {
  A: 65,
  Z: 90
};

function createCell(_, index) {
  return `
    <div 
      class="cell" 
      contenteditable 
      data-col="${index}" 
    ></div>
  `;
}

function createCol(col, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
      ${col}
      <div class="column__resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(cols, index = '') {
  return `
    <div class="row" data-type="resizable">
      <div class="row__info">
        ${index}
        ${index ? '<div class="row__resize" data-resize="row"></div>' : ''}
      </div>
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
