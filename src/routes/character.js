import {h} from 'preact';
import {connect} from 'react-redux';
import {compose, curry} from 'ramda';
import {debounce as throttle} from 'lodash';
import {Link} from 'react-router-dom';
import DocumentTitle from 'react-document-title';

import {Form, Input, Header, Button, Label, TextArea, Grid, Checkbox, Popup, Container} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.css';

import {
  newCharacter,
  changeCharacter,
  newCharacterBurden,
  changeCharacterBurden,
  removeCharacterBurden,
  newCharacterPower,
  changeCharacterPower,
  removeCharacterPower,
  newCharacterStunt,
  changeCharacterStunt,
  removeCharacterStunt,
  newCharacterEquipment,
  changeCharacterEquipment,
  removeCharacterEquipment,
} from '../actions';
import {character as characterSel} from '../selectors';

import styles from './character.css';

const fromEvent = ev => ev.target.value;

const INPUT_TIMEOUT = 1000;
const SCORE_TIMEOUT = 200;
const AREA_TIMEOUT = 1000;

const OverviewInput = (props) => (
  <Input label="Character Name" defaultValue={overview.name}
    disabled={!(props.onChange || props.onBlur)} {...props} />
)

const _CharacterOverview = ({
  overview,
  changeName,
  changeConcept,
  changeCrewName,
  changeCause,
  changeTarget,
  changeMethod,
  changeRace,
  changeSex,
  changeAge,
  changeHeight,
  changeWeight,
}) => (
  <div className={styles.overview}>
    <Header>Overview</Header>
    <Grid>
    <Grid.Row>
      <Grid.Column width={12}>
        <Input label="Character Name" defaultValue={overview.name}
          disabled={!changeName} onBlur={changeName} />
      </Grid.Column>
      <Grid.Column width={4}>
        <Input placeholder="Concept" defaultValue={overview.concept}
          disabled={!changeConcept} onChange={changeConcept} />
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column width={4}>
        <Label content="Crew Name" pointing="below" />
        <Input defaultValue={overview.crewName}
          disabled={!changeCrewName} onChange={changeCrewName} />
      </Grid.Column>
      <Grid.Column width={4}>
        <Label content="Cause" pointing="below" />
        <Input defaultValue={overview.cause}
          disabled={!changeCause} onChange={changeCause} />
      </Grid.Column>
      <Grid.Column width={4}>
        <Label content="Target" pointing="below" />
        <Input defaultValue={overview.target}
          disabled={!changeTarget} onChange={changeTarget} />
      </Grid.Column>
      <Grid.Column width={4}>
        <Label content="Method" pointing="below" />
        <Input defaultValue={overview.method}
          disabled={!changeMethod} onChange={changeMethod} />
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column width={4}>
        <Input placeholder="Race" defaultValue={overview.race}
          disabled={!changeRace} onChange={changeRace} list="races" />
        <datalist id='races'>
          <option value='Human' />
          <option value='Terris' />
          <option value='Koloss' />
          <option value='Kandra' />
          <option value='Malwish' />
        </datalist>
      </Grid.Column>
      <Grid.Column width={3}>
        <Input placeholder="Sex" defaultValue={overview.sex}
          disabled={!changeSex} onChange={changeSex} />
      </Grid.Column>
      <Grid.Column width={3}>
        <Input placeholder="Age" defaultValue={overview.age}
          disabled={!changeAge} onChange={changeAge} />
      </Grid.Column>
      <Grid.Column width={3}>
        <Input placeholder="Height" defaultValue={overview.height}
          disabled={!changeHeight} onChange={changeHeight} />
      </Grid.Column>
      <Grid.Column width={3}>
        <Input placeholder="Weight" defaultValue={overview.weight}
          disabled={!changeWeight} onChange={changeWeight} />
      </Grid.Column>
    </Grid.Row>
    </Grid>
  </div>
);

const CharacterOverview = connect(
  (state, {id}) => ({
    overview: characterSel.overviewInRoot(id, state),
  }),
  (dispatch, {id}) => ({
    changeName: (
      compose(dispatch, curry(changeCharacter)({id, key: 'name'}), fromEvent)
    ),
    changeConcept: throttle(
      compose(dispatch, curry(changeCharacter)({id, key: 'concept'}), fromEvent),
      1000
    ),
    changeCrewName: throttle(
      compose(dispatch, curry(changeCharacter)({id, key: 'crewName'}), fromEvent),
      1000
    ),
    changeCause: throttle(
      compose(dispatch, curry(changeCharacter)({id, key: 'cause'}), fromEvent),
      1000
    ),
    changeTarget: throttle(
      compose(dispatch, curry(changeCharacter)({id, key: 'target'}), fromEvent),
      1000
    ),
    changeMethod: throttle(
      compose(dispatch, curry(changeCharacter)({id, key: 'method'}), fromEvent),
      1000
    ),
    changeRace: throttle(
      compose(dispatch, curry(changeCharacter)({id, key: 'race'}), fromEvent),
      1000
    ),
    changeSex: throttle(
      compose(dispatch, curry(changeCharacter)({id, key: 'sex'}), fromEvent),
      1000
    ),
    changeAge: throttle(
      compose(dispatch, curry(changeCharacter)({id, key: 'age'}), fromEvent),
      1000
    ),
    changeHeight: throttle(
      compose(dispatch, curry(changeCharacter)({id, key: 'height'}), fromEvent),
      1000
    ),
    changeWeight: throttle(
      compose(dispatch, curry(changeCharacter)({id, key: 'weight'}), fromEvent),
      1000
    ),
  })
)(_CharacterOverview);

const _CharacterBurden = ({burden, changeBurden, removeBurden}) => (
  <div>
    <Input defaultValue={burden} disabled={!changeBurden}
      onChange={changeBurden} />
    {removeBurden ? <Button icon="delete" onClick={removeBurden} /> : null}
  </div>
);

const CharacterBurden = connect(
  (state, {id, burdenIndex}) => ({
    burden: characterSel.burdensInRoot(id, state)[burdenIndex],
  }),
  (dispatch, {id, burdenIndex}) => ({
    changeBurden: throttle(compose(
      dispatch,
      curry(changeCharacterBurden)({id}, burdenIndex),
      fromEvent
    ), INPUT_TIMEOUT),
    removeBurden: compose(
      dispatch,
      () => removeCharacterBurden({id}, burdenIndex)
    ),
  })
)(_CharacterBurden);

const _CharacterTraits = ({
  id,
  burdens,
  drive,
  profession,
  specialty,
  feature,
  personality,
  changeDrive,
  changeProfession,
  changeSpecialty,
  changeFeature,
  changePersonality,
  newBurden,
}) => (
  <div>
    <div>
      <Header>Traits</Header>
      <Input label="Drive" defaultValue={drive} disabled={!changeDrive} onChange={changeDrive} />
      <Input label="Profession" defaultValue={profession} disabled={!changeProfession} onChange={changeProfession} />
      <Input label="Specialty" defaultValue={specialty} disabled={!changeSpecialty} onChange={changeSpecialty} />
      <Input label="Feature" defaultValue={feature} disabled={!changeFeature} onChange={changeFeature} />
      <Input label="Personality" defaultValue={personality} disabled={!changePersonality} onChange={changePersonality} />
    </div>
    <div>
      <Header>Burdens</Header>
      {
        typeof burdens === 'number' ?
          Array(burdens)
          .fill(0)
          .map((_, i) => <CharacterBurden id={id} burdenIndex={i} />) :
          burdens
          .map(burden => <_CharacterBurden burden={burden} />)
      }
      {newBurden ? <Button icon="add" onClick={newBurden} /> : null}
    </div>
  </div>
);

const CharacterTraits = connect(
  (state, {id}) => ({
    drive: characterSel.traitsInRoot(id, state).drive,
    profession: characterSel.traitsInRoot(id, state).profession,
    specialty: characterSel.traitsInRoot(id, state).specialty,
    feature: characterSel.traitsInRoot(id, state).feature,
    personality: characterSel.traitsInRoot(id, state).personality,
    burdens: characterSel.burdensInRoot(id, state).length,
  }),
  (dispatch, {id}) => ({
    changeDrive: (
      throttle(compose(
        dispatch,
        curry(changeCharacter)({id, key: 'drive'}),
        fromEvent
      ), INPUT_TIMEOUT)
    ),
    changeProfession: (
      throttle(compose(
        dispatch,
        curry(changeCharacter)({id, key: 'profession'}),
        fromEvent
      ), INPUT_TIMEOUT)
    ),
    changeSpecialty: (
      throttle(compose(
        dispatch,
        curry(changeCharacter)({id, key: 'specialty'}),
        fromEvent
      ), INPUT_TIMEOUT)
    ),
    changeFeature: (
      throttle(compose(
        dispatch,
        curry(changeCharacter)({id, key: 'feature'}),
        fromEvent
      ), INPUT_TIMEOUT)
    ),
    changePersonality: (
      throttle(compose(
        dispatch,
        curry(changeCharacter)({id, key: 'personality'}),
        fromEvent
      ), INPUT_TIMEOUT)
    ),
    newBurden: compose(dispatch, () => newCharacterBurden({id})),
  })
)(_CharacterTraits);

const _AttributeScore = ({label, value, change}) => (
  <Input label={label} defaultValue={value} disabled={!change} onChange={change} />
);

const AttributeScore = connect(
  (state, {id, score}) => ({
    value: characterSel.scoresInRoot(id, state)[score],
  }),
  (dispatch, {id, score}) => ({
    change: throttle(compose(
      dispatch,
      curry(changeCharacter)({id, key: score}),
      v => Number(v) || 0,
      fromEvent
    ), SCORE_TIMEOUT),
  })
)(_AttributeScore);

const _StandingScore = ({label, value, spentValue, changeValue, changeSpent}) => (
  <div>
    <Input label={label} defaultValue={value} disabled={!changeValue} onChange={changeValue} />
    <Input label="spent" defaultValue={spentValue} disabled={!changeSpent} onChange={changeSpent} />
  </div>
);

const StandingScore = connect(
  (state, {id, score}) => ({
    value: characterSel.scoresInRoot(id, state)[score],
    spentValue: characterSel.scoresInRoot(id, state)[`${score}Less`],
  }),
  (dispatch, {id, score}) => ({
    changeValue: throttle(compose(
      dispatch,
      curry(changeCharacter)({id, key: score}),
      v => Number(v) || 0,
      fromEvent
    ), SCORE_TIMEOUT),
    changeSpent: throttle(compose(
      dispatch,
      curry(changeCharacter)({id, key: `${score}Less`}),
      v => Number(v) || 0,
      fromEvent
    ), SCORE_TIMEOUT),
  })
)(_StandingScore);

const _ResilienceScore = ({
  label,
  value, changeValue,
  damageValue, changeDamage,
  bonusValue, changeBonus,
}) => (
  <div>
    <Input label="bonus" defaultValue={bonusValue} disabled={!changeBonus} onChange={changeBonus} />
    <Input label="damage" defaultValue={damageValue} disabled={!changeDamage} onChange={changeDamage} />
    <Input label={label} disabled={true} value={value} />
  </div>
);

const ResilienceScore = connect(
  (state, {id, score, attribute, standing}) => ({
    value: (
      characterSel.scoresInRoot(id, state)[attribute] +
      characterSel.scoresInRoot(id, state)[standing] +
      characterSel.scoresInRoot(id, state)[`${standing}Less`] +
      characterSel.scoresInRoot(id, state)[`${score}Less`] +
      characterSel.scoresInRoot(id, state)[`${score}Bonus`]
    ),
    damageValue: characterSel.scoresInRoot(id, state)[`${score}Less`],
    bonusValue: characterSel.scoresInRoot(id, state)[`${score}Bonus`],
  }),
  (dispatch, {id, score}) => ({
    changeDamage: throttle(compose(
      dispatch,
      curry(changeCharacter)({id, key: `${score}Less`}),
      v => Number(v) || 0,
      fromEvent
    ), SCORE_TIMEOUT),
    changeBonus: throttle(compose(
      dispatch,
      curry(changeCharacter)({id, key: `${score}Bonus`}),
      v => Number(v) || 0,
      fromEvent
    ), SCORE_TIMEOUT),
  })
)(_ResilienceScore);

const _CharacterScores = ({scores}) => (
  console.log(scores),
  <div>
    <Header>Scores</Header>
    <div>
      <Header>Attributes</Header>
      <_AttributeScore label="Physique" score="physique" value={scores.physique} />
      <_AttributeScore label="Charm" score="charm" value={scores.charm} />
      <_AttributeScore label="Wits" score="wits" value={scores.wits} />
    </div>
    <div>
      <Header>Standing</Header>
      <_StandingScore label="Resources" score="resources" 
        value={scores.resources} spentValue={scores.resourcesLess} />
      <_StandingScore label="Influence" score="influence" 
        value={scores.influence} spentValue={scores.influenceLess} />
      <_StandingScore label="Spirit" score="spirit" 
        value={scores.spirit} spentValue={scores.spiritLess} />
    </div>
    <div>
      <Header>Resilience</Header>
      <_ResilienceScore label="Health" score="health"
        value={
          scores.physique + scores.resources + scores.resourcesLess +
          scores.healthBonus + scores.healthLess
        }
        damageValue={scores.healthLess}
        bonusValue={scores.healthBonus}
        attribute="physique" standing="resources" />
      <_ResilienceScore label="Reputation" score="reputation"
        value={
          scores.charm + scores.influence + scores.influenceLess +
          scores.reputationBonus + scores.reputationLess
        }
        damageValue={scores.reputationLess}
        bonusValue={scores.reputationBonus}
        attribute="charm" standing="influence" />
      <_ResilienceScore label="Willpower" score="willpower"
        value={
          scores.wits + scores.spirit + scores.spiritLess +
          scores.willpowerBonus + scores.willpowerLess
        }
        damageValue={scores.willpowerLess}
        bonusValue={scores.willpowerBonus}
        attribute="wits" standing="spirit" />
    </div>
  </div>
);

const CharacterScores = ({id}) => (
  <div>
    <Header>Scores</Header>
    <div>
      <Header>Attributes</Header>
      <AttributeScore id={id} label="Physique" score="physique" />
      <AttributeScore id={id} label="Charm" score="charm" />
      <AttributeScore id={id} label="Wits" score="wits" />
    </div>
    <div>
      <Header>Standing</Header>
      <StandingScore id={id} label="Resources" score="resources" />
      <StandingScore id={id} label="Influence" score="influence" />
      <StandingScore id={id} label="Spirit" score="spirit" />
    </div>
    <div>
      <Header>Resilience</Header>
      <ResilienceScore id={id} label="Health" score="health"
        attribute="physique" standing="resources" />
      <ResilienceScore id={id} label="Reputation" score="reputation"
        attribute="charm" standing="influence" />
      <ResilienceScore id={id} label="Willpower" score="willpower"
        attribute="wits" standing="spirit" />
    </div>
  </div>
);

const _CharacterLore = ({
  lore,
  changeTragedy,
  changeDestiny,
  changeSecretsknown,
}) => (
  <Form>
    <Header>Lore</Header>
  <Grid columns="3">
    <Grid.Column><Form.Field inline>
      <Form.Label>Tragedy</Form.Label>
      <Form.TextArea defaultValue={lore.tragedy} disabled={!changeTragedy} 
        onChange={changeTragedy} />
    </Form.Field></Grid.Column>
    <Grid.Column><Form.Field inline>
      <Form.Label>Destiny</Form.Label>
      <Form.TextArea defaultValue={lore.destiny} disabled={!changeDestiny} 
        onChange={changeDestiny} />
    </Form.Field></Grid.Column>
    <Grid.Column><Form.Field inline>
      <Form.Label>Secrets Known</Form.Label>
      <Form.TextArea defaultValue={lore.secretsKnown} 
        disabled={!changeSecretsknown} onChange={changeSecretsknown} />
    </Form.Field></Grid.Column>
  </Grid>
  </Form>
);

const CharacterLore = connect(
  (state, {id}) => ({
    lore: characterSel.loreInRoot(id, state),
  }),
  (dispatch, {id}) => ({
    changeTragedy: throttle(compose(
      dispatch,
      curry(changeCharacter)({id, key: 'tragedy'}),
      fromEvent
    ), AREA_TIMEOUT),
    changeDestiny: throttle(compose(
      dispatch,
      curry(changeCharacter)({id, key: 'destiny'}),
      fromEvent
    ), AREA_TIMEOUT),
    changeSecretsknown: throttle(compose(
      dispatch,
      curry(changeCharacter)({id, key: 'secretsKnown'}),
      fromEvent
    ), AREA_TIMEOUT),
  })
)(_CharacterLore);

const _Stunt = ({stunt, changeStunt, removeStunt}) => (
  <div>
    <Input defaultValue={stunt} disabled={!changeStunt} onChange={changeStunt} />
    {removeStunt ? <Button icon="delete" onClick={removeStunt} /> : null}
  </div>
);

const Stunt = connect(
  (state, {id, powerIndex, stuntIndex}) => ({
    stunt: characterSel.powersInRoot(id, state)[powerIndex].stunts[stuntIndex],
  }),
  (dispatch, {id, powerIndex, stuntIndex}) => ({
    changeStunt: throttle(compose(
      dispatch,
      curry(changeCharacterStunt)({id}, powerIndex, stuntIndex),
      fromEvent
    ), INPUT_TIMEOUT),
    removeStunt: compose(
      dispatch,
      () => removeCharacterStunt({id}, powerIndex, stuntIndex)
    ),
  })
)(_Stunt);

const _Power = ({
  id, powerIndex,
  name, changeName,
  type, changeType,
  rating, changeRating,
  charges, changeCharges,
  stunts,
  newStunt,
  removePower,
}) => (
  <div>
    <Input label="Name" defaultValue={name} disabled={!changeName}
      onChange={changeName} />
    <Input label="Type" defaultValue={type} disabled={!changeType}
      onChange={changeType} />
    <Input label="Rating" defaultValue={rating} disabled={!changeRating}
      onChange={changeRating} />
    <Input label="Charges" defaultValue={charges} disabled={!changeCharges}
      onChange={changeCharges} />
    {
      typeof stunts === 'number' ?
        Array(stunts)
        .fill(0)
        .map((_, i) => <Stunt id={id} powerIndex={powerIndex} stuntIndex={i} />) :
        stunts
        .map(stunt => <_Stunt stunt={stunt} />)
    }
    {newStunt ? <Button icon="add" onClick={newStunt} /> : null}
    {removePower ? <Button icon="delete" onClick={removePower} /> : null}
  </div>
);

const Power = connect(
  (state, {id, powerIndex}) => ({
    name: characterSel.powersInRoot(id, state)[powerIndex].name,
    type: characterSel.powersInRoot(id, state)[powerIndex].type,
    rating: characterSel.powersInRoot(id, state)[powerIndex].rating,
    charges: characterSel.powersInRoot(id, state)[powerIndex].charges,
    stunts: characterSel.powersInRoot(id, state)[powerIndex].stunts.length,
  }),
  (dispatch, {id, powerIndex}) => ({
    changeName: throttle(compose(
      dispatch,
      curry(changeCharacterPower)({id, key: powerIndex, subkey: 'name'}),
      fromEvent
    ), INPUT_TIMEOUT),
    changeType: throttle(compose(
      dispatch,
      curry(changeCharacterPower)({id, key: powerIndex, subkey: 'type'}),
      fromEvent
    ), INPUT_TIMEOUT),
    changeRating: throttle(compose(
      dispatch,
      curry(changeCharacterPower)({id, key: powerIndex, subkey: 'rating'}),
      v => Number(v) || 0,
      fromEvent
    ), SCORE_TIMEOUT),
    changeCharges: throttle(compose(
      dispatch,
      curry(changeCharacterPower)({id, key: powerIndex, subkey: 'charges'}),
      v => Number(v) || 0,
      fromEvent
    ), SCORE_TIMEOUT),
    newStunt: compose(
      dispatch,
      () => newCharacterStunt({id}, powerIndex)
    ),
    removePower: compose(
      dispatch,
      () => removeCharacterPower({id}, powerIndex)
    ),
  })
)(_Power);

const _CharacterPowers = ({id, powers, newPower}) => (
  <div>
    <Header>Powers</Header>
    {
      typeof powers === 'number' ?
        Array(powers)
        .fill(0)
        .map((_, i) => <Power id={id} powerIndex={i} />) :
        powers
        .map(power => <_Power {...power} />)
    }
    {newPower ? <Button icon="add" onClick={newPower} /> : null}
  </div>
);

const CharacterPowers = connect(
  (state, {id}) => ({
    powers: characterSel.powersInRoot(id, state).length,
  }),
  (dispatch, {id}) => ({
    newPower: compose(
      dispatch,
      () => newCharacterPower({id})
    ),
  })
)(_CharacterPowers);

const _Item = ({
  name, changeName,
  rules, changeRules,
  prop, changeProp,
  removeItem,
}) => (
  <div>
    <Input label="Name" defaultValue={name} disabled={!changeName}
      onChange={changeName} />
    <Input label="Rules" defaultValue={rules} disabled={!changeRules}
      onChange={changeRules} />
    <Checkbox label="Prop" checked={prop} disabled={!changeProp}
      onChange={changeProp} />
    {removeItem ? <Button icon="delete" onClick={removeItem} /> : null}
  </div>
);

const Item = connect(
  (state, {id, equipmentIndex}) => ({
    name: characterSel.equipmentInRoot(id, state)[equipmentIndex].name,
    rules: characterSel.equipmentInRoot(id, state)[equipmentIndex].rules,
    prop: characterSel.equipmentInRoot(id, state)[equipmentIndex].prop,
  }),
  (dispatch, {id, equipmentIndex}) => ({
    changeName: throttle(compose(
      dispatch,
      curry(changeCharacterEquipment)({id, subkey: 'name'}, equipmentIndex),
      fromEvent
    ), INPUT_TIMEOUT),
    changeRules: throttle(compose(
      dispatch,
      curry(changeCharacterEquipment)({id, subkey: 'rules'}, equipmentIndex),
      fromEvent
    ), INPUT_TIMEOUT),
    changeProp: compose(
      dispatch,
      curry(changeCharacterEquipment)({id, subkey: 'prop'}, equipmentIndex),
      Boolean,
      (ev, data) => data.checked
    ),
    removeItem: compose(
      dispatch,
      () => removeCharacterEquipment({id}, equipmentIndex)
    ),
  })
)(_Item);

const _CharacterEquipment = ({id, items, newItem}) => (
  <div>
    <Header>Equipment</Header>
    {
      typeof items === 'number' ?
        Array(items)
        .fill(0)
        .map((_, i) => <Item id={id} equipmentIndex={i} />) :
        items
        .map(item => <_Item {...item} />)
    }
    {newItem ? <Button icon="add" onClick={newItem} /> : null}
  </div>
);

const CharacterEquipment = connect(
  (state, {id}) => ({
    items: characterSel.equipmentInRoot(id, state).length,
  }),
  (dispatch, {id}) => ({
    newItem: compose(
      dispatch,
      () => newCharacterEquipment({id})
    ),
  })
)(_CharacterEquipment);

const CharacterMenu = ({id, characterStr}) => (
  <Button.Group>
    <Button icon="left chevron" content="Back" as={Link} to={`/character`} />
    {
      id ?
        <Button icon="download" content="Export"
          as={Link} to={`/character/export/${id}`} /> :
        <Button icon="upload" content="Import"
          as={Link} to={`/character/import/${characterStr}`} />
    }
    {
      id ?
        <Button icon="qrcode" content={id}
          as={Link} to={`/character/${id}`} /> :
        null
    }
  </Button.Group>
);

const _Character = ({character}) => (
  <Container as="div">
    <CharacterMenu characterStr={btoa(JSON.stringify(character))} />
    <_CharacterOverview overview={character.overview} />
    <_CharacterScores scores={character.scores} />
    <_CharacterTraits burdens={character.traits.burdens}
      {...character.traits.traits} />
    <_CharacterPowers powers={character.powers} />
    <_CharacterEquipment items={character.equipment} />
    <_CharacterLore lore={character.lore} />
  </Container>
);

const Character = ({isCharacter, characterName, match, newCharacter}) => (
  <DocumentTitle title={`Mistborn RPG: ${characterName}`}>
    {
      isCharacter ?
      <Container as="div" key="character">
        <CharacterMenu id={match.params.id} />
        <CharacterOverview id={match.params.id} />
        <CharacterScores id={match.params.id} />
        <CharacterTraits id={match.params.id} />
        <CharacterPowers id={match.params.id} />
        <CharacterEquipment id={match.params.id} />
        <CharacterLore id={match.params.id} />
      </Container> :
      newCharacter()
    }
  </DocumentTitle>
);

export {
  _Character as Character,
};

export default connect(
  (state, {match}) => ({
    isCharacter: Boolean(characterSel.inRoot(match.params.id, state)),
    characterName: characterSel.nameInRoot(match.params.id, state),
  }),
  (dispatch, {match}) => ({
    newCharacter: compose(dispatch, () => newCharacter({id: match.params.id}))
  })
)(Character);
