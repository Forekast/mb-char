import {
  NEW_CHARACTER,
  CHANGE_CHARACTER,
  NEW_CHARACTER_EQUIPMENT,
  CHANGE_CHARACTER_EQUIPMENT,
  REMOVE_CHARACTER_EQUIPMENT,
} from '../../constants/action-types';

const equipment = (state = [], action) => {
  switch (action.type) {
  case NEW_CHARACTER:
    return [];
  case CHANGE_CHARACTER:
    switch (action.subtype) {
    case NEW_CHARACTER_EQUIPMENT:
      return state.concat({
        name: '',
        rules: '',
        prop: true,
      });
    case CHANGE_CHARACTER_EQUIPMENT:
      return [].concat(
        state.slice(0, action.key),
        Object.assign({}, state, {
          [action.subkey]: action.value,
        }),
        state.slice(action.key + 1)
      );
    case REMOVE_CHARACTER_EQUIPMENT:
      return [].concat(
        state.slice(0, action.key),
        state.slice(action.key + 1)
      );
    }
  default:
    return state;
  }
};

export default equipment;
