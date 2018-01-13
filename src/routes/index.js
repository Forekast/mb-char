import {h} from 'preact';

import {Switch, Route} from 'react-router-dom';

import Character from './character';
import Start from './start';

const Routes = () => (
  <div>
    <Route exact path="/" component={Start} />
    <Route exact path="/character/:id" component={Character} />
  </div>
);

export default Routes;
