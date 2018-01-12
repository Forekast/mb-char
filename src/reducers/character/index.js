import {combineReducers} from 'redux';

import id from './id';
import overview from './overview';
import scores from './scores';
import powers from './powers';
import equipment from './equipment';
import traits from './traits';
import lore from './lore';

const character = combineReducers({
  id,
  overview,
  scores,
  powers,
  equipment,
  traits,
  lore,
});

export default character;
