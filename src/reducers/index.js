import {combineReducers} from 'redux';

import {
  NEW_CHARACTER,
  CHANGE_CHARACTER,
  REMOVE_CHARACTER,
  FULL_CHARACTER,
  IMPORT_CHARACTER,
} from '../constants/action-types';

import character from './character';

const createId = () => (
  'xxxxxxxx'.replace(/x/g, () => (Math.random() * 36).toString(36)[0])
);

const characterSet = (state = [], action) => {
  let index;
  switch (action.type) {
  case NEW_CHARACTER:
    return state.concat(character({}, action));
  case CHANGE_CHARACTER:
    index = state.findIndex(c => c.id.code === action.id);
    if (index !== -1) {
      return [].concat(
        state.slice(0, index),
        character(state[index], action),
        state.slice(index + 1)
      );
    }
    return state;
  case REMOVE_CHARACTER:
    index = state.findIndex(c => c.id.code === action.id);
    return [].concat(
      state.slice(0, index),
      state.slice(index + 1)
    );
  case FULL_CHARACTER:
    if (action.remote) {
      index = state.findIndex(c => c.id.code === action.id);
      if (index !== -1 && !state[index].id.owner) {
        return [].concat(
          state.slice(0, index),
          action.character,
          state.slice(index + 1)
        );
      }
    }
    return state;
  case IMPORT_CHARACTER:
    let id = action._id;
    if (!id) {
      id = createId();
      action._id = id;
    }
    return state.concat(Object.assign(
      {id: {code: id, owner: true}},
      action.character,
      {overview: Object.assign(
        {},
        action.character.overview,
        {name: action.character.overview.name + ' copy'}
      )}
    ));
  default:
    return state;
  }
};

export const object = {
  characterSet,
};

export default combineReducers(object);
