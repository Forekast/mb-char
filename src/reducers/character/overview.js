import {NEW_CHARACTER, CHANGE_CHARACTER} from '../../constants/action-types';

const OVERVIEW_KEYS = [
  'name',
  'concept',
  'crewName',
  'cause',
  'target',
  'method',
  'race',
  'sex',
  'age',
  'height',
  'weight',
];

const overview = (state = {}, action) => {
  switch (action.type) {
  case NEW_CHARACTER:
    return {
      name: action.name || '',
      concept: '',
      crewName: '',
      cause: '',
      target: '',
      method: '',
      race: '',
      sex: '',
      age: '',
      height: '',
      weight: '',
    };
  case CHANGE_CHARACTER:
    if (!action.subtype && OVERVIEW_KEYS.indexOf(action.key) !== -1) {
      return Object.assign({}, state, {
        [action.key]: action.value,
      });
    }
  default:
    return state;
  }
};

export default overview;
