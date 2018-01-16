import {
  NEW_CHARACTER,
  CHANGE_CHARACTER,
  NEW_CHARACTER_SCORE_MOD,
  CHANGE_CHARACTER_SCORE_MOD,
  REMOVE_CHARACTER_SCORE_MOD,
} from '../../constants/action-types';

const SCORE_KEYS = [
  'advancements',
  'physique',
  'charm',
  'wits',
  'resources',
  'influence',
  'spirit',
];

const scores = (state = {}, action) => {
  switch (action.type) {
  case NEW_CHARACTER:
    return {
      advancements: 0,
      physique: 0,
      physiqueMods: [],
      charm: 0,
      charmMods: [],
      wits: 0,
      witsMods: [],
      resources: 0,
      resourcesMods: [],
      influence: 0,
      influenceMods: [],
      spirit: 0,
      spiritMods: [],
      healthMods: [],
      reputationMods: [],
      willpowerMods: [],
    };
  case CHANGE_CHARACTER:
    if (!action.subtype && SCORE_KEYS.indexOf(action.key) !== -1) {
      return Object.assign({}, state, {
        [action.key]: action.value,
      });
    }
    switch (action.subtype) {
    case NEW_CHARACTER_SCORE_MOD:
      return Object.assign({}, state, {
        [action.key + 'Mods']: [].concat(
          (state[action.key + 'Mods'] || []),
          {name: '', value: 0}
        ),
      });
    case CHANGE_CHARACTER_SCORE_MOD:
      return Object.assign({}, state, {
        [action.key + 'Mods']: [].concat(
          (state[action.key + 'Mods'] || []).slice(0, action.subkey),
          Object.assign(
            {},
            (state[action.key + 'Mods'] || [])[action.subkey],
            action.payload
          ),
          (state[action.key + 'Mods'] || []).slice(action.subkey + 1)
        ),
      });
    case REMOVE_CHARACTER_SCORE_MOD:
      return Object.assign({}, state, {
        [action.key + 'Mods']: [].concat(
          (state[action.key + 'Mods'] || []).slice(0, action.subkey),
          (state[action.key + 'Mods'] || []).slice(action.subkey + 1)
        ),
      });
    default:
      return state;
    }
  default:
    return state;
  }
};

export default scores;
