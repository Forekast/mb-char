import {h} from 'preact';

import {Character} from './character';

const StaticCharacter = ({match}) => (
  // <div>Static</div>
  <Character character={(
    console.log(match.params.characterStr),
    JSON.parse(decodeURIComponent(escape(atob(decodeURIComponent(match.params.characterStr)))))
  )} />
);

export default StaticCharacter;
