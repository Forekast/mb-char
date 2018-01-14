import {h} from 'preact';
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'ramda';
import DocumentTitle from 'react-document-title';

import {Form} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.css';

import {newCharacter} from '../actions';

import Field from '../components/field';

const Start = ({location, characterIds, newCharacter}) => {
  if (characterIds.filter(id => id.owner).length > 0) {
    return <Redirect from={location} to={`/character/${characterIds.filter(id => id.owner)[0].code}`} />;
  }

  return (<DocumentTitle title="Mistborn RPG"><div>
    <Form
      action="#"
      onSubmit={ev => (
        newCharacter({
          name: ev.target.getElementsByTagName('input')[0].value,
        })
      )}>
      <p>Name your first character</p>
      <Form.Input />
      <Form.Button>Create</Form.Button>
    </Form>
  </div></DocumentTitle>);
};

export default connect(
  (state, {location}) => ({
    location: location.pathname,
    characterIds: state.characterSet.map(c => c.id),
  }),
  dispatch => ({
    newCharacter: compose(dispatch, newCharacter),
  })
)(Start);
