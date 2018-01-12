import {h, render} from 'preact';

import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import Routes from './routes';
import configureStore from './store';

render((<Provider store={configureStore()}><HashRouter>
  <Routes />
</HashRouter></Provider>), document.getElementById('root'));
