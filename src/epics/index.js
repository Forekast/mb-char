import {combineEpics} from 'redux-most';

import shareCharacter from './share-character';

export default combineEpics([
  shareCharacter,
]);
