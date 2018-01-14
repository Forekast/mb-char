import {NEW_CHARACTER, CHANGE_CHARACTER} from '../../constants/action-types';

const LORE_KEYS = [
  'tragedy',
  'destiny',
  'secretsKnown',
];

const lore = (state = {}, action) => {
  switch (action.type) {
  case NEW_CHARACTER:
    return {
      tragedy: '',
      destiny: '',
      secretsKnown: '',
    };
  case CHANGE_CHARACTER:
    if (!action.subtype && LORE_KEYS.indexOf(action.key) !== -1) {
      return Object.assign({}, state, {
        [action.key]: action.value,
      });
    }
  default:
    return state;
  }
};

export default lore;
