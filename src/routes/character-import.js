import {h} from 'preact';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {character as characterSel} from '../selectors';
import {importCharacter} from '../actions';

const _CharacterExport = ({match, importCharacter}) => (
  importCharacter(JSON.parse(atob(match.params.characterStr))),
  <Redirect to={`/character`} />
);

export default connect(
  (state, {match}) => ({
    character: characterSel.inRoot(match.params.id, state),
  }),
  (dispatch, {match}) => ({
    importCharacter: char => dispatch(importCharacter(char)),
  })
)(_CharacterExport);
