import {h} from 'preact';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {character as characterSel} from '../selectors';
import {importCharacter} from '../actions';

const _CharacterImport = ({match, importCharacter}) => (
  importCharacter(JSON.parse(decodeURIComponent(escape(atob(decodeURIComponent(match.params.characterStr)))))),
  <Redirect to={`/character`} />
);

export default connect(
  (state, {match}) => ({
    character: characterSel.inRoot(match.params.id, state),
  }),
  (dispatch, {match}) => ({
    importCharacter: char => dispatch(importCharacter(char)),
  })
)(_CharacterImport);
