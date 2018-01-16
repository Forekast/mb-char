import {h} from 'preact';

import {Character} from './character';

const StaticCharacter = ({match}) => (
  // <div>Static</div>
  <Character character={JSON.parse(atob(match.params.characterStr))} />
);

export default StaticCharacter;
