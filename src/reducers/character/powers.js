import {
  NEW_CHARACTER,
  CHANGE_CHARACTER,
  NEW_CHARACTER_POWER,
  CHANGE_CHARACTER_POWER,
  REMOVE_CHARACTER_POWER,
  NEW_CHARACTER_STUNT,
  CHANGE_CHARACTER_STUNT,
  REMOVE_CHARACTER_STUNT,
} from '../../constants/action-types';

const powers = (state = [], action) => {
  switch (action.type) {
  case NEW_CHARACTER:
    return [];
  case CHANGE_CHARACTER:
    switch (action.subtype) {
    case NEW_CHARACTER_POWER:
      return state.concat({
        name: '',
        type: '',
        rating: 0,
        charges: 0,
        stunts: [],
      });
    case CHANGE_CHARACTER_POWER:
      return [].concat(
        state.slice(0, action.key),
        Object.assign({}, state[action.key], {
          [action.subkey]: action.value,
        }),
        state.slice(action.key + 1)
      );
    case REMOVE_CHARACTER_POWER:
      return [].concat(
        state.slice(0, action.key),
        state.slice(action.key + 1)
      );
    case NEW_CHARACTER_STUNT:
      return [].concat(
        state.slice(0, action.key),
        Object.assign({}, state[action.key], {
          stunts: state[action.key].stunts.concat(''),
        }),
        state.slice(action.key + 1)
      );
    case CHANGE_CHARACTER_STUNT:
      return [].concat(
        state.slice(0, action.key),
        Object.assign({}, state[action.key], {
          stunts: [].concat(
            state[action.key].stunts.slice(0, action.subkey),
            action.value,
            state[action.key].stunts.slice(action.subkey + 1)
          )
        }),
        state.slice(action.key + 1)
      );
    case REMOVE_CHARACTER_STUNT:
      return [].concat(
        state.slice(0, action.key),
        Object.assign({}, state[action.key], {
          stunts: [].concat(
            state[action.key].stunts.slice(0, action.subkey),
            state[action.key].stunts.slice(action.subkey + 1)
          )
        }),
        state.slice(action.key + 1)
      );
    }
  default:
    return state;
  }
};

export default powers;
