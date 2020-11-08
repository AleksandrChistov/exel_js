import {
  APPLY_STYLE,
  CHANGE_STYLES,
  CHANGE_TEXT,
  CHANGE_TITLE,
  RESIZE_TABLE
} from './types';

export function resizeTable(data) {
  return {
    type: RESIZE_TABLE,
    data
  };
}

export function changeTitle(data) {
  return {
    type: CHANGE_TITLE,
    data
  };
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data
  };
}

export function changeStyles(data) {
  return {
    type: CHANGE_STYLES,
    data
  };
}


export function applyStyle(data) {
  return {
    type: APPLY_STYLE,
    data
  };
}
