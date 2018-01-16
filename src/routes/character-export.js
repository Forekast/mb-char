import {h} from 'preact';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {character as characterSel} from '../selectors';

const _CharacterExport = ({character}) => (
  <Redirect to={`/character/static/${btoa(JSON.stringify(
    Object.assign({}, character, {id: undefined})
  ))}`} />
);

export default connect(
  (state, {match}) => ({
    character: characterSel.inRoot(match.params.id, state),
  })
)(_CharacterExport);
