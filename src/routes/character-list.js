import {h} from 'preact';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {DocumentTitle} from 'react-document-title';
import {
  Input, Header, Button, Grid, Menu, Segment, Form, Checkbox, Container,
} from 'semantic-ui-react';
import {compose} from 'ramda';

import {newCharacter, removeCharacter} from '../actions';

import styles from './character-list.css';

const _CharacterList = ({characters, newCharacter, addCharacter, removeCharacter}) => (
  <DocumentTitle title="Mistborn RPG">
    <Container as="div">
    <Button content="Toggle Delete Buttons" onClick={ev => (
      ev.currentTarget.parentElement.classList.toggle('edit')
    )} />
    <Menu vertical fluid>
      {
        characters
        .filter(c => c.id.owner)
        .map(c => (<Menu.Item
          as={Link}
          to={`/character/${c.id.code}`}
          style={{position: 'relative'}}>
          {c.overview.name}
          <Button className={styles.delete} icon="delete" content="Delete" _characterId={c.id.code}
            style={{position: 'absolute', right: 0, top: '3px', bottom: '2px'}}
            onClick={removeCharacter}/>
        </Menu.Item>))
      }
      <Menu.Item fitted>
        <Input
          placeholder="Name ..."
          action={{icon: 'add', content: 'New', onClick: newCharacter}}
          onKeyUp={ev => ev.which === 13 && newCharacter(ev)} />
      </Menu.Item>
    </Menu>
    <Header>Remote</Header>
    <Menu vertical fluid>
      {
        characters
        .filter(c => !c.id.owner)
        .map(c => (<Menu.Item
          as={Link}
          to={`/character/${c.id.code}`}
          style={{position: 'relative'}}>
          {c.overview.name || ' '}
          <Button className={styles.delete} icon="delete" content="Delete" _characterId={c.id.code}
            style={{position: 'absolute', right: 0, top: '3px', bottom: '2px'}}
            onClick={removeCharacter}/>
        </Menu.Item>))
      }
      <Menu.Item fitted>
        <Input
          placeholder="Remote code ..."
          action={{icon: 'add', content: 'Add', onClick: addCharacter}}
          onKeyUp={ev => ev.which === 13 && addCharacter(ev)} />
      </Menu.Item>
    </Menu>
    </Container>
  </DocumentTitle>
);

const siblingInput = node => (
  node.parentElement.getElementsByTagName('input')[0]
);

const getValueAndClear = ev => {
  const value = siblingInput(ev.currentTarget).value;
  siblingInput(ev.currentTarget).value = '';
  return value;
};

const getValueAndPreventDefault = ev => {
  ev.preventDefault();
  return ev.currentTarget.attributes._characterId.value;
};

export default connect(
  state => ({
    characters: state.characterSet,
  }),
  dispatch => ({
    newCharacter: compose(
      dispatch,
      name => newCharacter({name}),
      getValueAndClear
    ),
    addCharacter: compose(
      dispatch,
      id => newCharacter({id}),
      getValueAndClear
    ),
    removeCharacter: compose(
      dispatch,
      id => removeCharacter({id}),
      getValueAndPreventDefault
    ),
  })
)(_CharacterList);
