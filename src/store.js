import {
  createStore,
  applyMiddleware
} from 'redux';
import {
  createEpicMiddleware,
  createStateStreamEnhancer
} from 'redux-most';

import reducers from './reducers';

export default function() {
  return createStore(reducers);
};
