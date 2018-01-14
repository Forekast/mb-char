import {combineReducers} from 'redux';

import {
  NEW_CHARACTER, CHANGE_CHARACTER, REMOVE_CHARACTER, FULL_CHARACTER
} from '../constants/action-types';

import character from './character';

const characterSet = (state = [], action) => {
  let index;
  switch (action.type) {
  case NEW_CHARACTER:
    return state.concat(character({}, action));
  case CHANGE_CHARACTER:
    index = state.findIndex(c => c.id.code === action.id);
    return [].concat(
      state.slice(0, index),
      character(state[index], action),
      state.slice(index + 1)
    );
  case REMOVE_CHARACTER:
    index = state.findIndex(c => c.id.code === action.id);
    return [].concat(
      state.slice(0, index),
      state.slice(index + 1)
    );
  case FULL_CHARACTER:
    if (action.remote) {
      index = state.findIndex(c => c.id.code === action.id);
      if (index === -1) {
        return state.concat(action.character);
      }
      else if (!state[index].id.owner) {
        return [].concat(
          state.slice(0, index),
          action.character,
          state.slice(index + 1)
        );
      }
    }
  default:
    return state;
  }
};

export const object = {
  characterSet,
};

export default combineReducers(object);
