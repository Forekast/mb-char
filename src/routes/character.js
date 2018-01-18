import {h} from 'preact';
import {connect} from 'react-redux';
import {compose, curry} from 'ramda';
import {debounce} from 'lodash';
import {Link} from 'react-router-dom';
import DocumentTitle from 'react-document-title';

import Button from 'semantic-ui-react/dist/es/elements/Button';
import Input from 'semantic-ui-react/dist/es/elements/Input';
import Icon from 'semantic-ui-react/dist/es/elements/Icon';
import Header from 'semantic-ui-react/dist/es/elements/Header';
import Segment from 'semantic-ui-react/dist/es/elements/Segment';
import Checkbox from 'semantic-ui-react/dist/es/modules/Checkbox';
import Container from 'semantic-ui-react/dist/es/elements/Container';
import Form from 'semantic-ui-react/dist/es/collections/Form';
import Menu from 'semantic-ui-react/dist/es/collections/Menu';
import Grid from 'semantic-ui-react/dist/es/collections/Grid';
import Divider from 'semantic-ui-react/dist/es/elements/Divider';
import TextArea from 'semantic-ui-react/dist/es/addons/TextArea';
import Label from 'semantic-ui-react/dist/es/elements/Label';

import 'semantic-ui-css/semantic.css';

import {
  newCharacter,
  changeCharacter,
  newCharacterScoreMod,
  changeCharacterScoreMod,
  removeCharacterScoreMod,
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
    readOnly={!(props.onChange || props.onBlur)} {...props} />
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
      <Grid.Column width={10}>
        <Input label="Character Name" defaultValue={overview.name}
          readOnly={!changeName} onBlur={changeName} />
      </Grid.Column>
      <Grid.Column width={6}>
        <Input placeholder="Concept" defaultValue={overview.concept}
          readOnly={!changeConcept} onChange={changeConcept} />
      </Grid.Column>
      <Grid.Column width={4}>
        <Label content="Crew Name" pointing="below" size="mini" />
        <Input defaultValue={overview.crewName} size="mini"
          readOnly={!changeCrewName} onChange={changeCrewName} />
      </Grid.Column>
      <Grid.Column width={4}>
        <Label content="Cause" pointing="below" size="mini" />
        <Input defaultValue={overview.cause} size="mini"
          readOnly={!changeCause} onChange={changeCause} />
      </Grid.Column>
      <Grid.Column width={4}>
        <Label content="Target" pointing="below" size="mini" />
        <Input defaultValue={overview.target} size="mini"
          readOnly={!changeTarget} onChange={changeTarget} />
      </Grid.Column>
      <Grid.Column width={4}>
        <Label content="Method" pointing="below" size="mini" />
        <Input defaultValue={overview.method} size="mini"
          readOnly={!changeMethod} onChange={changeMethod} />
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column width={4}>
        <Input placeholder="Race" defaultValue={overview.race} size="mini"
          readOnly={!changeRace} onChange={changeRace} list="races" />
        <datalist id='races'>
          <option value='Human' />
          <option value='Terris' />
          <option value='Koloss' />
          <option value='Kandra' />
          <option value='Malwish' />
        </datalist>
      </Grid.Column>
      <Grid.Column width={3}>
        <Input placeholder="Sex" defaultValue={overview.sex} size="mini"
          readOnly={!changeSex} onChange={changeSex} />
      </Grid.Column>
      <Grid.Column width={3}>
        <Input placeholder="Age" defaultValue={overview.age} size="mini"
          readOnly={!changeAge} onChange={changeAge} />
      </Grid.Column>
      <Grid.Column width={3}>
        <Input placeholder="Height" defaultValue={overview.height} size="mini"
          readOnly={!changeHeight} onChange={changeHeight} />
      </Grid.Column>
      <Grid.Column width={3}>
        <Input placeholder="Weight" defaultValue={overview.weight} size="mini"
          readOnly={!changeWeight} onChange={changeWeight} />
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
    changeConcept: debounce(
      compose(dispatch, curry(changeCharacter)({id, key: 'concept'}), fromEvent),
      1000
    ),
    changeCrewName: debounce(
      compose(dispatch, curry(changeCharacter)({id, key: 'crewName'}), fromEvent),
      1000
    ),
    changeCause: debounce(
      compose(dispatch, curry(changeCharacter)({id, key: 'cause'}), fromEvent),
      1000
    ),
    changeTarget: debounce(
      compose(dispatch, curry(changeCharacter)({id, key: 'target'}), fromEvent),
      1000
    ),
    changeMethod: debounce(
      compose(dispatch, curry(changeCharacter)({id, key: 'method'}), fromEvent),
      1000
    ),
    changeRace: debounce(
      compose(dispatch, curry(changeCharacter)({id, key: 'race'}), fromEvent),
      1000
    ),
    changeSex: debounce(
      compose(dispatch, curry(changeCharacter)({id, key: 'sex'}), fromEvent),
      1000
    ),
    changeAge: debounce(
      compose(dispatch, curry(changeCharacter)({id, key: 'age'}), fromEvent),
      1000
    ),
    changeHeight: debounce(
      compose(dispatch, curry(changeCharacter)({id, key: 'height'}), fromEvent),
      1000
    ),
    changeWeight: debounce(
      compose(dispatch, curry(changeCharacter)({id, key: 'weight'}), fromEvent),
      1000
    ),
  })
)(_CharacterOverview);

const _CharacterBurden = ({burden, changeBurden, removeBurden}) => (
  <div>
    <Input defaultValue={burden} readOnly={!changeBurden}
      onChange={changeBurden} action={removeBurden ? {icon: 'delete', onClick: removeBurden} : null} />
  </div>
);

const CharacterBurden = connect(
  (state, {id, burdenIndex}) => ({
    burden: characterSel.burdensInRoot(id, state)[burdenIndex],
  }),
  (dispatch, {id, burdenIndex}) => ({
    changeBurden: debounce(compose(
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
  <Grid className={styles.traits}>
    <Grid.Column width={8}>
      <Header>Traits</Header>
      <Input label="Drive" defaultValue={drive} readOnly={!changeDrive} onChange={changeDrive} />
      <Input label="Profession" defaultValue={profession} readOnly={!changeProfession} onChange={changeProfession} />
      <Input label="Specialty" defaultValue={specialty} readOnly={!changeSpecialty} onChange={changeSpecialty} />
      <Input label="Feature" defaultValue={feature} readOnly={!changeFeature} onChange={changeFeature} />
      <Input label="Personality" defaultValue={personality} readOnly={!changePersonality} onChange={changePersonality} />
    </Grid.Column>
    <Grid.Column width={8}>
      <Header>Burdens</Header>
      {
        typeof burdens === 'number' ?
          Array(burdens)
          .fill(0)
          .map((_, i) => <CharacterBurden id={id} burdenIndex={i} />) :
          burdens
          .map(burden => <_CharacterBurden burden={burden} />)
      }
      {newBurden ? <Button icon="add" content="Add Burden" onClick={newBurden} /> : null}
    </Grid.Column>
  </Grid>
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
      debounce(compose(
        dispatch,
        curry(changeCharacter)({id, key: 'drive'}),
        fromEvent
      ), INPUT_TIMEOUT)
    ),
    changeProfession: (
      debounce(compose(
        dispatch,
        curry(changeCharacter)({id, key: 'profession'}),
        fromEvent
      ), INPUT_TIMEOUT)
    ),
    changeSpecialty: (
      debounce(compose(
        dispatch,
        curry(changeCharacter)({id, key: 'specialty'}),
        fromEvent
      ), INPUT_TIMEOUT)
    ),
    changeFeature: (
      debounce(compose(
        dispatch,
        curry(changeCharacter)({id, key: 'feature'}),
        fromEvent
      ), INPUT_TIMEOUT)
    ),
    changePersonality: (
      debounce(compose(
        dispatch,
        curry(changeCharacter)({id, key: 'personality'}),
        fromEvent
      ), INPUT_TIMEOUT)
    ),
    newBurden: compose(dispatch, () => newCharacterBurden({id})),
  })
)(_CharacterTraits);

const _ScoreMods = ({mods, changeModValue, changeModName, removeMod}) => (
  <div>
  {
    typeof mods === 'number' ?
      Array(mods)
      .fill(0)
      .map((_, i) => (
        <Input />
      )) :
      mods
      .map((mod, i) => (
        <Input size="mini" defaultValue={mod.name} readOnly={!changeModName}
          onChange={changeModName ? changeModName(i) : null} action>
          <Input defaultValue={mod.value} readOnly={!changeModValue}
            onChange={changeModValue ? changeModValue(i) : null}
            style={{width: '5em', textAlign: 'right'}} min={-10} max={10}
            step={1} type="number">
            <input style={{textAlign: 'right'}} />
          </Input>
          <input />
          {removeMod ? <Button icon="delete" onClick={removeMod(i)} /> : <span />}
        </Input>
      ))
  }
  </div>
);

const _AttributeScore = ({label, value, change, mods, newMod, changeModValue, changeModName, removeMod}) => (
  <div>
    <Input label={label} action={newMod ? {icon: 'adjust', onClick: newMod} : null} defaultValue={value} readOnly={!change} onChange={change} type="number" min="1" max="10" step="1" />
    <_ScoreMods mods={mods} changeModValue={changeModValue} changeModName={changeModName} removeMod={removeMod} />
  </div>
);

const AttributeScore = connect(
  (state, {id, score}) => ({
    value: characterSel.scoresInRoot(id, state)[score],
    mods: characterSel.scoresInRoot(id, state)[`${score}Mods`] || [],
  }),
  (dispatch, {id, score}) => ({
    change: debounce(compose(
      dispatch,
      curry(changeCharacter)({id, key: score}),
      v => Number(v) || 0,
      fromEvent
    ), SCORE_TIMEOUT),
    newMod: compose(
      dispatch,
      () => newCharacterScoreMod({id}, score)
    ),
    changeModValue: index => debounce(compose(
      dispatch,
      curry(changeCharacterScoreMod)({id}, score, index),
      v => ({value: Number(v) || 0}),
      fromEvent
    ), SCORE_TIMEOUT),
    changeModName: index => debounce(compose(
      dispatch,
      curry(changeCharacterScoreMod)({id}, score, index),
      name => ({name}),
      fromEvent
    ), INPUT_TIMEOUT),
    removeMod: index => compose(
      dispatch,
      () => removeCharacterScoreMod({id}, score, index),
    ),
  })
)(_AttributeScore);

const _StandingScore = ({label, value, spentValue, changeValue, changeSpent}) => (
  <div>
    <Input label={label} defaultValue={value} readOnly={!changeValue} onChange={changeValue} />
    <Input label="spent" defaultValue={spentValue} readOnly={!changeSpent} onChange={changeSpent} />
  </div>
);

const StandingScore = connect(
  (state, {id, score}) => ({
    value: characterSel.scoresInRoot(id, state)[score],
    spentValue: characterSel.scoresInRoot(id, state)[`${score}Less`],
  }),
  (dispatch, {id, score}) => ({
    changeValue: debounce(compose(
      dispatch,
      curry(changeCharacter)({id, key: score}),
      v => Number(v) || 0,
      fromEvent
    ), SCORE_TIMEOUT),
    changeSpent: debounce(compose(
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
    <Input label="bonus" defaultValue={bonusValue} readOnly={!changeBonus} onChange={changeBonus} />
    <Input label="damage" defaultValue={damageValue} readOnly={!changeDamage} onChange={changeDamage} />
    <Input label={label} readOnly={true} value={value} />
  </div>
);

const ResilienceScore = connect(
  (state, {id, score, attribute, standing}) => ({
    value: (
      characterSel.scoresInRoot(id, state)[attribute] +
      (characterSel.scoresInRoot(id, state)[`${attribute}Mods`] || [])
      .reduce((carry, {value}) => carry + value, 0) +
      characterSel.scoresInRoot(id, state)[standing] +
      (characterSel.scoresInRoot(id, state)[`${standing}Mods`] || [])
      .reduce((carry, {value}) => carry + value, 0) +
      (characterSel.scoresInRoot(id, state)[`${score}Mods`] || [])
      .reduce((carry, {value}) => carry + value, 0)
    ),
    mods: characterSel.scoresInRoot(id, state)[`${score}Mods`] || []
  }),
  (dispatch, {id, score}) => ({
    newMod: compose(
      dispatch,
      () => newCharacterScoreMod({id}, score)
    ),
    changeModValue: index => debounce(compose(
      dispatch,
      curry(changeCharacterScoreMod)({id}, score, index),
      v => ({value: Number(v) || 0}),
      fromEvent
    ), SCORE_TIMEOUT),
    changeModName: index => debounce(compose(
      dispatch,
      curry(changeCharacterScoreMod)({id}, score, index),
      name => ({name}),
      fromEvent
    ), INPUT_TIMEOUT),
    removeMod: index => compose(
      dispatch,
      () => removeCharacterScoreMod({id}, score, index),
    ),
  })
)(_AttributeScore);

const _CharacterScores = ({scores}) => (
  <div className={styles.scores}>
    <Header>Scores</Header>
    <Grid>
    <Grid.Row columns={3}>
    <Grid.Column>
      <Header>Attributes</Header>
      <_AttributeScore label="Physique" score="physique" value={scores.physique} mods={(scores.physiqueMods || [])} />
      <_AttributeScore label="Charm" score="charm" value={scores.charm} mods={(scores.charmMods || [])} />
      <_AttributeScore label="Wits" score="wits" value={scores.wits} mods={(scores.witsMods || [])} />
    </Grid.Column>
    <Grid.Column>
      <Header>Standing</Header>
      <_AttributeScore label="Resources" score="resources"
        mods={(scores.resourcesMods || [])} value={scores.resources}
        spentValue={scores.resourcesLess} />
      <_AttributeScore label="Influence" score="influence"
        mods={(scores.influenceMods || [])} value={scores.influence}
        spentValue={scores.influenceLess} />
      <_AttributeScore label="Spirit" score="spirit"
        mods={(scores.spiritMods || [])} value={scores.spirit}
        spentValue={scores.spiritLess} />
    </Grid.Column>
    <Grid.Column>
      <Header>Resilience</Header>
      <_AttributeScore label="Health" score="health"
        value={
          scores.physique + (scores.physiqueMods || [])
          .reduce((carry, {value}) => carry + value, 0) +
          scores.resources + (scores.resourcesMods || [])
          .reduce((carry, {value}) => carry + value, 0) +
          (scores.healthMods || [])
          .reduce((carry, {value}) => carry + value, 0)
        }
        mods={(scores.healthMods || [])}
        attribute="physique" standing="resources" />
      <_AttributeScore label="Reputation" score="reputation"
        value={
          scores.charm + (scores.charmMods || [])
          .reduce((carry, {value}) => carry + value, 0) +
          scores.influence + (scores.influenceMods || [])
          .reduce((carry, {value}) => carry + value, 0) +
          (scores.reputationMods || [])
          .reduce((carry, {value}) => carry + value, 0)
        }
        mods={(scores.reputationMods || [])}
        attribute="charm" standing="influence" />
      <_AttributeScore label="Willpower" score="willpower"
        value={
          scores.wits + (scores.witsMods || [])
          .reduce((carry, {value}) => carry + value, 0) +
          scores.spirit + (scores.spiritMods || [])
          .reduce((carry, {value}) => carry + value, 0) +
          (scores.willpowerMods || [])
          .reduce((carry, {value}) => carry + value, 0)
        }
        mods={(scores.willpowerMods || [])}
        attribute="wits" standing="spirit" />
    </Grid.Column>
    </Grid.Row>
    </Grid>
  </div>
);

const CharacterScores = ({id}) => (
  <div className={styles.scores}>
    <Header>Scores</Header>
    <Grid>
    <Grid.Row columns={3}>
    <Grid.Column>
      <Header>Attributes</Header>
      <AttributeScore id={id} label="Physique" score="physique" />
      <AttributeScore id={id} label="Charm" score="charm" />
      <AttributeScore id={id} label="Wits" score="wits" />
    </Grid.Column>
    <Grid.Column>
      <Header>Standing</Header>
      <AttributeScore id={id} label="Resources" score="resources" />
      <AttributeScore id={id} label="Influence" score="influence" />
      <AttributeScore id={id} label="Spirit" score="spirit" />
    </Grid.Column>
    <Grid.Column>
      <Header>Resilience</Header>
      <ResilienceScore id={id} label="Health" score="health"
        attribute="physique" standing="resources" />
      <ResilienceScore id={id} label="Reputation" score="reputation"
        attribute="charm" standing="influence" />
      <ResilienceScore id={id} label="Willpower" score="willpower"
        attribute="wits" standing="spirit" />
    </Grid.Column>
    </Grid.Row>
    </Grid>
  </div>
);

const _CharacterLore = ({
  lore,
  changeTragedy,
  changeDestiny,
  changeSecretsknown,
  changeBackstory,
  changeNotes,
}) => (
  <Form>
    <Header>Lore</Header>
    <Form.Field>
      <Label pointing="below">Tragedy</Label>
      <Form.TextArea defaultValue={lore.tragedy} readOnly={!changeTragedy} 
        onChange={changeTragedy} autoHeight />
    </Form.Field>
    <Form.Field>
      <Label pointing="below">Destiny</Label>
      <Form.TextArea defaultValue={lore.destiny} readOnly={!changeDestiny} 
        onChange={changeDestiny} autoHeight />
    </Form.Field>
    <Form.Field>
      <Label pointing="below">Secrets Known</Label>
      <Form.TextArea defaultValue={lore.secretsKnown} 
        readOnly={!changeSecretsknown} onChange={changeSecretsknown} autoHeight />
    </Form.Field>
    <Form.Field>
      <Label pointing="below">Backstory</Label>
      <Form.TextArea defaultValue={lore.backstory} 
        readOnly={!changeBackstory} onChange={changeBackstory} autoHeight />
    </Form.Field>
    <Form.Field>
      <Label pointing="below">Notes</Label>
      <Form.TextArea defaultValue={lore.notes} 
        readOnly={!changeNotes} onChange={changeNotes} autoHeight />
    </Form.Field>
  </Form>
);

const CharacterLore = connect(
  (state, {id}) => ({
    lore: characterSel.loreInRoot(id, state),
  }),
  (dispatch, {id}) => ({
    changeTragedy: debounce(compose(
      dispatch,
      curry(changeCharacter)({id, key: 'tragedy'}),
      fromEvent
    ), AREA_TIMEOUT),
    changeDestiny: debounce(compose(
      dispatch,
      curry(changeCharacter)({id, key: 'destiny'}),
      fromEvent
    ), AREA_TIMEOUT),
    changeSecretsknown: debounce(compose(
      dispatch,
      curry(changeCharacter)({id, key: 'secretsKnown'}),
      fromEvent
    ), AREA_TIMEOUT),
    changeBackstory: debounce(compose(
      dispatch,
      curry(changeCharacter)({id, key: 'backstory'}),
      fromEvent
    ), AREA_TIMEOUT),
    changeNotes: debounce(compose(
      dispatch,
      curry(changeCharacter)({id, key: 'notes'}),
      fromEvent
    ), AREA_TIMEOUT),
  })
)(_CharacterLore);

const _Stunt = ({stunt, changeStunt, removeStunt}) => (
  <Input defaultValue={stunt} readOnly={!changeStunt} onChange={changeStunt}
    action={removeStunt ? {icon: 'delete', onClick: removeStunt} : null} />
);

const Stunt = connect(
  (state, {id, powerIndex, stuntIndex}) => ({
    stunt: characterSel.powersInRoot(id, state)[powerIndex].stunts[stuntIndex],
  }),
  (dispatch, {id, powerIndex, stuntIndex}) => ({
    changeStunt: debounce(compose(
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
  <Grid>
  <Grid.Row>
    <Grid.Column width={6} className={styles.power}>
      <Input label="Name" defaultValue={name} readOnly={!changeName}
      onChange={changeName} /></Grid.Column>
    <Grid.Column width={4} className={styles.power}>
      <Input placeholder="Type" defaultValue={type} readOnly={!changeType}
      onChange={changeType} /></Grid.Column>
    <Grid.Column width={2} className={styles.power}>
      <Input placeholder="Rating" defaultValue={rating || ''} readOnly={!changeRating}
      onChange={changeRating} /></Grid.Column>
    <Grid.Column width={3} className={styles.power}>
      <Input placeholder="Charges" defaultValue={charges || ''} readOnly={!changeCharges}
      onChange={changeCharges} /></Grid.Column>
    <Grid.Column width={1} className={styles.power}>
      {removePower ? <Button icon="delete" onClick={removePower} /> : null}</Grid.Column>
    {
      typeof stunts === 'number' ?
        Array(stunts)
        .fill(0)
        .map((_, i) => 
    <Grid.Column width={4}><Stunt id={id} powerIndex={powerIndex} stuntIndex={i} /></Grid.Column>) :
        stunts
        .map(stunt => 
    <Grid.Column width={4}><_Stunt stunt={stunt} /></Grid.Column>)
    }
    {newStunt ? 
    <Grid.Column width={16}><Button icon="add" content="Add Stunt" onClick={newStunt} /></Grid.Column> : null}
  </Grid.Row>
  </Grid>
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
    changeName: debounce(compose(
      dispatch,
      curry(changeCharacterPower)({id, key: powerIndex, subkey: 'name'}),
      fromEvent
    ), INPUT_TIMEOUT),
    changeType: debounce(compose(
      dispatch,
      curry(changeCharacterPower)({id, key: powerIndex, subkey: 'type'}),
      fromEvent
    ), INPUT_TIMEOUT),
    changeRating: debounce(compose(
      dispatch,
      curry(changeCharacterPower)({id, key: powerIndex, subkey: 'rating'}),
      v => Number(v) || 0,
      fromEvent
    ), SCORE_TIMEOUT),
    changeCharges: debounce(compose(
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
    {newPower ? <Grid><Grid.Row><Grid.Column><Button icon="add" content="Add Power" onClick={newPower} /></Grid.Column></Grid.Row></Grid> : null}
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
  <Grid className={styles.equipmentItem}>
    <Grid.Row>
    <Grid.Column width={4}><Input label="Name" defaultValue={name} readOnly={!changeName}
      onChange={changeName} /></Grid.Column>
    <Grid.Column width={9}><Input label="Rules" defaultValue={rules} readOnly={!changeRules}
      onChange={changeRules} /></Grid.Column>
    <Grid.Column width={2}><Checkbox label="Prop" checked={prop} readOnly={!changeProp}
      onChange={changeProp} /></Grid.Column>
    {removeItem ? <Grid.Column width={1}><Button icon="delete" onClick={removeItem} /></Grid.Column> : null}
    </Grid.Row>
  </Grid>
);

const Item = connect(
  (state, {id, equipmentIndex}) => ({
    name: characterSel.equipmentInRoot(id, state)[equipmentIndex].name,
    rules: characterSel.equipmentInRoot(id, state)[equipmentIndex].rules,
    prop: characterSel.equipmentInRoot(id, state)[equipmentIndex].prop,
  }),
  (dispatch, {id, equipmentIndex}) => ({
    changeName: debounce(compose(
      dispatch,
      curry(changeCharacterEquipment)({id, subkey: 'name'}, equipmentIndex),
      fromEvent
    ), INPUT_TIMEOUT),
    changeRules: debounce(compose(
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
    {newItem ? <Grid><Grid.Row><Grid.Column width={16}><Button icon="add" content="Add Item" onClick={newItem} /></Grid.Column></Grid.Row></Grid> : null}
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

const _ConnectionStatus = ({characterId, network, className}) => (
  characterId ?
    (<span className={className}><Icon name="user" />{characterId.owner ?
      network.connections.reduce((carry, c) => (
        carry + (c.reads.indexOf(characterId.code) !== -1 ? 1 : 0)
      ), 0) + ' Connected' :
      (
        network.connections.find(c => (
          c.owns.indexOf(characterId.code) !== -1
        )) ?
          'Connected' :
          'Disconnected'
      )}</span>) :
    <span />
);

export const ConnectionStatus = connect(
  (state, {id}) => ({
    characterId: id ? characterSel.inRoot(id, state).id : null,
    network: state.network,
  })
)(_ConnectionStatus);

const _NetworkStatus = ({id, characterId, network}) => (
  <Button>
    <span><Icon name="wifi" />{
      network.status.state === 'ONLINE' ?
        'Online' :
        'Offline'
    }</span>
    &nbsp;
    {<_ConnectionStatus characterId={characterId} network={network} />}
  </Button>
);

export const NetworkStatus = connect(
  (state, {id}) => ({
    characterId: id ? characterSel.inRoot(id, state).id : null,
    network: state.network,
  })
)(_NetworkStatus);

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
    <NetworkStatus id={id} />
  </Button.Group>
);

const _Character = ({character}) => (
  <Container as="div">
    <CharacterMenu characterStr={encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(character)))))} />
    <Divider />
    <_CharacterOverview overview={character.overview} />
    <Divider />
    <_CharacterScores scores={character.scores} />
    <Divider />
    <_CharacterTraits burdens={character.traits.burdens}
      {...character.traits.traits} />
    <Divider />
    <_CharacterPowers powers={character.powers} />
    <Divider />
    <_CharacterEquipment items={character.equipment} />
    <Divider />
    <_CharacterLore lore={character.lore} />
  </Container>
);

const Character = ({isCharacter, characterName, match, newCharacter}) => (
  <DocumentTitle title={`Mistborn RPG: ${characterName}`}>
    {
      isCharacter ?
      <Container as="div" key="character">
        <CharacterMenu id={match.params.id} />
        <Divider />
        <CharacterOverview id={match.params.id} />
        <Divider />
        <CharacterScores id={match.params.id} />
        <Divider />
        <CharacterTraits id={match.params.id} />
        <Divider />
        <CharacterPowers id={match.params.id} />
        <Divider />
        <CharacterEquipment id={match.params.id} />
        <Divider />
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
