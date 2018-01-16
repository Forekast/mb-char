import {h} from 'preact';

import {Switch, Route} from 'react-router-dom';

import Character from './character';
import CharacterList from './character-list';
import CharacterStatic from './character-static';
import CharacterExport from './character-export';
import CharacterImport from './character-import';
import Start from './start';

const Routes = () => (
  <div>
    <Route exact path="/" component={Start} />
    <Route exact path="/character" component={CharacterList} />
    <Route exact path="/character/import/:characterStr" component={CharacterImport} />
    <Route exact path="/character/export/:id" component={CharacterExport} />
    <Route exact path="/character/static/:characterStr" component={CharacterStatic} />
    <Route exact path="/character/:id" component={Character} />
  </div>
);

export default Routes;
