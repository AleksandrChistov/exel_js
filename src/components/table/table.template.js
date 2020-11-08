import {defaultStyles} from '@/constants';
import {toInlineStyles} from '@core/utils';
import {parse} from '@core/parse';

const CODES = {
  A: 65,
  Z: 90
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function createCell({data, col, row, width, styles}) {
  return `
    <div 
      class="cell" 
      contenteditable 
      data-type="cell"
      data-col="${col}"
      data-id="${row}:${col}"
      data-value="${data}"
      style="${styles}; width: ${width}px"
    >${parse(data)}</div>
  `;
}

function createCol({text, col, width}) {
  return `
    <div 
    class="column" 
    data-type="resizable" 
    data-col="${col}" 
    style="width: ${width}px"
    >
      ${text}
      <div class="column__resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(cells, row = 0, height) {
  return `
    <div 
      class="row" 
      data-type="resizable" 
      data-row="${row - 1}" 
      style="height: ${height}px"
    >
      <div class="row__info">
        ${row
        ? `${row}<div class="row__resize" data-resize="row"></div>`
        : ''}
      </div>
      <div class="row__data">${cells}</div>
    </div>
  `;
}

function createChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function getHeight(rowState = {}, row) {
  return rowState[row] || DEFAULT_HEIGHT;
}

function getData(state = {}, row = null) {
  return function(text, col) {
    const id = `${row}:${col}`;
    return {
      col,
      row,
      text,
      data: state.dataState[id] || '',
      width: state.colState[col] || DEFAULT_WIDTH,
      styles: toInlineStyles({
        ...defaultStyles,
        ...state.stylesState[id]
      })
    };
  };
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
      .fill('')
      .map(createChar)
      .map(getData(state))
      .map(createCol)
      .join('');

  rows.push(createRow(cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(getData(state, row))
        .map(createCell)
        .join('');

    rows.push(createRow(cells, row + 1, getHeight(state.rowState, row)));
  }

  return rows.join('');
}
