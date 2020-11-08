import {storage} from '@core/utils';
import {defaultStyles, defaultTitle} from '@/constants';

const defaultState = {
  currentTitle: defaultTitle,
  currentText: '',
  currentStyles: defaultStyles,
  stylesState: {},
  dataState: {},
  colState: {},
  rowState: {}
};

export const initialState = storage('excel-state')
  ? storage('excel-state')
  : defaultState;
