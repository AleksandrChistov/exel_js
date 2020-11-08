import {
  APPLY_STYLE,
  CHANGE_STYLES,
  CHANGE_TEXT,
  CHANGE_TITLE,
  RESIZE_TABLE
} from './types';

export function rootReducer(state, action) {
  switch (action.type) {
    case RESIZE_TABLE: {
      const field = action.data.type === 'col' ? 'colState' : 'rowState';
      const prevState = state[field] || {};
      prevState[action.data.id] = action.data.value;
      return {...state, [field]: prevState};
    }
    case CHANGE_TITLE: {
      return {...state, 'currentTitle': action.data.trim()};
    }
    case CHANGE_TEXT: {
      const value = action.data.value;
      const prevState = state['dataState'] || {};
      prevState[action.data.id] = value;
      return {...state, 'currentText': value, 'dataState': prevState};
    }
    case CHANGE_STYLES: {
      return {...state, 'currentStyles': action.data};
    }
    case APPLY_STYLE: {
      const value = action.data.value;
      const prevState = state['stylesState'] || {};
      action.data.ids.forEach(id => {
        prevState[id] = {...prevState[id], ...value};
      });
      return {
        ...state,
        'stylesState': prevState,
        'currentStyles': {...state.currentStyles, ...value},
      };
    }
    default:
      return state;
  }
}
