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

import {object} from './reducers';

const persistConfig = {
  key: 'root',
  storage: localForage,
};

const persistReducers = persistCombineReducers(persistConfig, object);

export default function() {
  const store = createStore(
    persistReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  const persistor = persistStore(store);
  return {persistor, store};
};
