import {
  createStore,
  applyMiddleware
} from 'redux';
import {
  createEpicMiddleware,
  createStateStreamEnhancer
} from 'redux-most';
import {persistStore, persistCombineReducers} from 'redux-persist';
import localForage from 'localforage';
import {compose} from 'ramda';

import {object} from './reducers';
import epics from './epics';

const persistConfig = {
  key: 'root',
  storage: localForage,
};

const persistReducers = persistCombineReducers(persistConfig, object);

export default function() {
  const store = createStore(
    persistReducers,
    compose(
      createStateStreamEnhancer(createEpicMiddleware(epics)),
      window.__REDUX_DEVTOOLS_EXTENSION__ ?
        window.__REDUX_DEVTOOLS_EXTENSION__() :
        (i => i)
    )
  );
  const persistor = persistStore(store);
  return {persistor, store};
};
