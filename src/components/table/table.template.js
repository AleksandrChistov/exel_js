const CODES = {
  A: 65,
  Z: 90
};

function createCell(row) {
  return function(_, col) {
    return `
      <div 
        class="cell" 
        contenteditable 
        data-type="cell"
        data-col="${col}"
        data-id="${row}:${col}" 
      ></div>
    `;
  };
}

function createCol(col, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
      ${col}
      <div class="column__resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(cells, index = '') {
  return `
    <div class="row" data-type="resizable">
      <div class="row__info">
        ${index}
        ${index ? '<div class="row__resize" data-resize="row"></div>' : ''}
      </div>
      <div class="row__data">${cells}</div>
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

  rows.push(createRow(cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(createCell(row))
        .join('');

    rows.push(createRow(cells, row + 1));
  }

  return rows.join('');
}
