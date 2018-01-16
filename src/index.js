import {h, render} from 'preact';

// import 'preact/devtools';

import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';

import Routes from './routes';
import configureStore from './store';

window.regeneratorRuntime = require('regenerator-runtime');

const {persistor, store} = configureStore();

render((<Provider store={store}><PersistGate persistor={persistor}><HashRouter>
  <Routes />
</HashRouter></PersistGate></Provider>), document.getElementById('root'));
