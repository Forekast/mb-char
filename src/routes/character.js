import {h} from 'preact';
import {connect} from 'react-redux';
import {compose, curry} from 'ramda';
import {debounce as throttle} from 'lodash';
import DocumentTitle from 'react-document-title';

import {Form, Input, Header, Button, Label, TextArea, Grid, Checkbox} from 'semantic-ui-react';
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

const fromEvent = ev => ev.target.value;

const INPUT_TIMEOUT = 1000;
const SCORE_TIMEOUT = 200;
const AREA_TIMEOUT = 1000;

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
  <div>
    <Header>Overview</Header>
    <Input label="Character Name"
      defaultValue={overview.name} onBlur={changeName} />
    <Input label="Concept"
      defaultValue={overview.concept} onChange={changeConcept} />
    <Input label="Crew Name"
      defaultValue={overview.crewName} onChange={changeCrewName} />
    <Input label="Cause" defaultValue={overview.cause}
      onChange={changeCause} />
    <Input label="Target" defaultValue={overview.target}
      onChange={changeTarget} />
    <Input label="Method" defaultValue={overview.method}
      onChange={changeMethod} />
    <Input label="Race" defaultValue={overview.race}
      onChange={changeRace} />
    <Input label="Sex" defaultValue={overview.sex}
      onChange={changeSex} />
    <Input label="Age" defaultValue={overview.age}
      onChange={changeAge} />
    <Input label="Height" defaultValue={overview.height}
      onChange={changeHeight} />
    <Input label="Weight" defaultValue={overview.weight}
      onChange={changeWeight} />
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
    <Input defaultValue={burden} onChange={changeBurden} />
    <Button icon="delete" onClick={removeBurden} />
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
      <Input label="Drive" defaultValue={drive} onChange={changeDrive} />
      <Input label="Profession" defaultValue={profession} onChange={changeProfession} />
      <Input label="Specialty" defaultValue={specialty} onChange={changeSpecialty} />
      <Input label="Feature" defaultValue={feature} onChange={changeFeature} />
      <Input label="Personality" defaultValue={personality} onChange={changePersonality} />
    </div>
    <div>
      <Header>Burdens</Header>
      {
        Array(burdens)
        .fill(0)
        .map((_, i) => <CharacterBurden id={id} burdenIndex={i} />)
      }
      <Button icon="add" onClick={newBurden} />
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
  <Input label={label} defaultValue={value} onChange={change} />
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
    <Input label={label} defaultValue={value} onChange={changeValue} />
    <Input label="spent" defaultValue={spentValue} onChange={changeSpent} />
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
    <Input label="bonus" defaultValue={bonusValue} onChange={changeBonus} />
    <Input label="damage" defaultValue={damageValue} onChange={changeDamage} />
    <span><Label>{label}</Label>{value}</span>
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
      <Form.TextArea defaultValue={lore.tragedy} onChange={changeTragedy} />
    </Form.Field></Grid.Column>
    <Grid.Column><Form.Field inline>
      <Form.Label>Destiny</Form.Label>
      <Form.TextArea defaultValue={lore.destiny} onChange={changeDestiny} />
    </Form.Field></Grid.Column>
    <Grid.Column><Form.Field inline>
      <Form.Label>Secrets Known</Form.Label>
      <Form.TextArea defaultValue={lore.secretsKnown} onChange={changeSecretsknown} />
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
    <Input defaultValue={stunt} onChange={changeStunt} />
    <Button icon="delete" onClick={removeStunt} />
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
    <Input label="Name" defaultValue={name} onChange={changeName} />
    <Input label="Type" defaultValue={type} onChange={changeType} />
    <Input label="Rating" defaultValue={rating} onChange={changeRating} />
    <Input label="Charges" defaultValue={charges} onChange={changeCharges} />
    {
      Array(stunts)
      .fill(0)
      .map((_, i) => <Stunt id={id} powerIndex={powerIndex} stuntIndex={i} />)
    }
    <Button icon="add" onClick={newStunt} />
    <Button icon="delete" onClick={removePower} />
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
      Array(powers)
      .fill(0)
      .map((_, i) => <Power id={id} powerIndex={i} />)
    }
    <Button icon="add" onClick={newPower} />
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
    <Input label="Name" defaultValue={name} onChange={changeName} />
    <Input label="Rules" defaultValue={rules} onChange={changeRules} />
    <Checkbox label="Prop" checked={prop} onChange={changeProp} />
    <Button icon="delete" onClick={removeItem} />
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
      Array(items)
      .fill(0)
      .map((_, i) => <Item id={id} equipmentIndex={i} />)
    }
    <Button icon="add" onClick={newItem} />
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

const Character = ({isCharacter, characterName, match, newCharacter}) => (
  <DocumentTitle title={`Mistborn RPG: ${characterName}`}>
    {
      isCharacter ?
      <div key="character">
        <CharacterOverview id={match.params.id} />
        <CharacterScores id={match.params.id} />
        <CharacterTraits id={match.params.id} />
        <CharacterPowers id={match.params.id} />
        <CharacterEquipment id={match.params.id} />
        <CharacterLore id={match.params.id} />
      </div> :
      newCharacter()
    }
  </DocumentTitle>
);

export default connect(
  (state, {match}) => ({
    isCharacter: Boolean(characterSel.inRoot(match.params.id, state)),
    characterName: characterSel.nameInRoot(match.params.id, state),
  }),
  (dispatch, {match}) => ({
    newCharacter: compose(dispatch, () => newCharacter({id: match.params.id}))
  })
)(Character);
