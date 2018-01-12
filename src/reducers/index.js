import {combineReducers} from 'redux';

import {
  NEW_CHARACTER, CHANGE_CHARACTER, REMOVE_CHARACTER
} from '../constants/action-types';

import character from './character';

const characterSet = (state = [], action) => {
  let index;
  switch (action.type) {
  case NEW_CHARACTER:
    return state.concat(character({}, action));
  case CHANGE_CHARACTER:
    index = state.findIndex(c => c.id.code === action.id);
    return state
      .slice(0, index)
      .concat(character(state[index], action), state.slice(index + 1));
  case REMOVE_CHARACTER:
    index = state.findIndex(c => c.id.code === action.id);
    return state.slice(0, index).concat(state.slice(index + 1));
  default:
    return state;
  }
};

export default combineReducers({
  characterSet,
});