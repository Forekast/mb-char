import {
  NEW_CHARACTER,
  CHANGE_CHARACTER,
  NEW_CHARACTER_BURDEN,
  CHANGE_CHARACTER_BURDEN,
  REMOVE_CHARACTER_BURDEN,
} from '../../constants/action-types';

const TRAIT_KEYS = [
  'drive',
  'profession',
  'specialty',
  'feature',
  'personality',
];

const traits = (state = {}, action) => {
  switch (action.type) {
  case NEW_CHARACTER:
    return {
      traits: {
        drive: '',
        profession: '',
        specialty: '',
        feature: '',
        personality: '',
      },
      burdens: [],
    };
  case CHANGE_CHARACTER:
    if (!action.subtype && TRAIT_KEYS.indexOf(action.key) !== -1) {
      return {
        traits: Object.assign({}, state.traits, {
          [action.key]: action.value,
        }),
        burdens: state.burdens,
      };
    }
    switch (action.subtype) {
    case NEW_CHARACTER_BURDEN:
      return {
        traits: state.traits,
        burdens: state.burdens.concat(action.value || ''),
      };
    case CHANGE_CHARACTER_BURDEN:
      return {
        traits: state.traits,
        burdens: [].concat(
          state.burdens.slice(0, action.key),
          action.value,
          state.burdens.slice(action.key + 1)
        ),
      };
    case REMOVE_CHARACTER_BURDEN:
      return {
        traits: state.traits,
        burdens: [].concat(
          state.burdens.slice(0, action.key),
          state.burdens.slice(action.key + 1)
        ),
      };
    }
  default:
    return state;
  }
};

export default traits;
