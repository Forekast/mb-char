import {NEW_CHARACTER, CHANGE_CHARACTER} from '../../constants/action-types';

const SCORE_KEYS = [
  'advancements',
  'physique',
  'physiqueLess',
  'charm',
  'charmLess',
  'wits',
  'witsLess',
  'resources',
  'resourcesLess',
  'influence',
  'influenceLess',
  'spirit',
  'spiritLess',
  'healthBonus',
  'healthLess',
  'reputationBonus',
  'reputationLess',
  'willpowerBonus',
  'willpowerLess',
];

const scores = (state = {}, action) => {
  switch (action.type) {
  case NEW_CHARACTER:
    return {
      advancements: 0,
      physique: 0,
      physiqueLess: 0,
      charm: 0,
      charmLess: 0,
      wits: 0,
      witsLess: 0,
      resources: 0,
      resourcesLess: 0,
      influence: 0,
      influenceLess: 0,
      spirit: 0,
      spiritLess: 0,
      healthBonus: 0,
      healthLess: 0,
      reputationBonus: 0,
      reputationLess: 0,
      willpowerBonus: 0,
      willpowerLess: 0,
    };
  case CHANGE_CHARACTER:
    if (SCORE_KEYS.indexOf(action.key) !== -1) {
      return Object.assign({}, state, {
        [action.key]: action.value,
      });
    }
  default:
    return state;
  }
};

export default scores;
