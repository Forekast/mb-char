import {h} from 'preact';

import {Switch, Route} from 'react-router-dom';

import Character from './character';
import Start from './start';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Start} />
    <Route path="/character" component={Character} />
  </Switch>
);

export default Routes;
