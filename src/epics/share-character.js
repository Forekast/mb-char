import swarm from 'webrtc-swarm';
import signalhub from 'signalhub';
import {
  withState,
  select,
  combineEpics,
} from 'redux-most';
import {curry, compose} from 'ramda';
import {
  from as mostFrom,
  map as _map,
  generate,
  observe as _observe,
  chain as _chain,
  take as _take,
  merge,
  filter as _filter,
  mergeArray,
  tap as _tap,
} from 'most';

import {character as characterSel} from '../selectors';
import {
  NEW_CHARACTER,
  CHANGE_CHARACTER,
  REMOVE_CHARACTER,
  FULL_CHARACTER,
} from '../constants/action-types';
import {
  fullCharacter,
} from '../actions';

const PERSIST_REHYDRATE = 'persist/REHYDRATE';

const HUB_ADDRESSES = [
  'http://1.tcp.ngrok.io:23009',
  // 'http://localhost:8000',
];

const swarms = {};

const map = curry(_map);
const observe = curry(_observe);
const chain = curry(_chain);
const take = curry(_take);
const filter = curry(_filter);
const tap = curry(_tap);

const hub = signalhub(`mistborn`, HUB_ADDRESSES);

const sw = swarm(hub, {});

const _shareCharacter = (characterId, action$) => {
  if (swarms[characterId.code]) {return;}

  let character = null;
  const characters = [];
  let queue = [];
  let resolve = () => null;

  // const hub = signalhub(`mistborn-${characterId.code}`, HUB_ADDRESSES);
  //
  // const sw = swarm(hub, {});

  console.log('share', characterId.code);

  sw.on('peer', function (peer, id) {
    console.log('connected to a new peer:', id);
    console.log('total peers:', sw.peers.length);
    console.dir(peer);
    console.log(characters);
    for (const character of characters) {
      console.log(character);
      console.log('send', character.type);
      peer.send(JSON.stringify(character));
    }
    if (characterId.owner && character) {
      peer.send(JSON.stringify(character));
    }

    peer.on('data', function(data) {
      const action = JSON.parse(data.toString());
      console.log('data', action);
      action.remote = true;
      queue.push(action);
      resolve();
    });
  });

  // sw.on('signal', function(data) {
  //   const action = JSON.parse(data.toString());
  //   console.log('signal', action);
  //   action.remote = true;
  //   queue.push(action);
  //   resolve();
  // })

  sw.on('disconnect', function (peer, id) {
    console.log('disconnected from a peer:', id);
    console.log('total peers:', sw.peers.length);
  });

  sw.on('close', function () {
    console.log('close');
    queue = null;
    resolve();
  });

  sw.on('end', function () {
    console.log('end');
    queue = null;
    resolve();
  });

  sw.on('destroy', function () {
    console.log('destroy');
    queue = null;
    resolve();
  });

  swarms[characterId.code] = sw;

  console.log('1');

  compose(
    observe(action => {
      if (action.remote) {return;}
      console.log(FULL_CHARACTER, action);
      if (characterId.code === action.id) {
        character = action;
      }
      const index = characters.findIndex(c => c.id === action.id);
      if (index !== -1) {
        characters[index] = action;
      }
      else {
        characters.push(action);
      }
    }),
    select(FULL_CHARACTER)
  )(action$);

  console.log('2');

  console.dir(sw);
  compose(
    observe(action => {
      console.log(CHANGE_CHARACTER, action);
      if (!action.remote) {
        for (const peer of sw.peers) {
          peer.send(JSON.stringify(action));
        }
      }
    }),
    select(CHANGE_CHARACTER)
  )(action$);

  console.log('3');
  const g = generate(function* () {
    console.log('generator');
    while (queue !== null) {
      if (queue.length) {
        yield Promise.resolve(queue.shift());
      }
      else {
        yield new Promise(_resolve => {
          resolve = _resolve;
        })
        .then(() => queue && queue.shift());
      }
    }
  }, 0);
  console.log(g);
  return compose(
    s => (console.log(s), s),
    tap(v => console.log(v)),
    s => (console.log(s), s),
    filter(Boolean),
    s => (console.log(s), s)
  )(g);
};

const _stopShare = id => {
  if (!swarms[id.code]) {return;}
  swarms[id.code].close();
  swarms[id.code] = null;
};

const shareCharacter = (action$, state$) => {
  compose(
    observe(_stopShare),
    map(([state, action]) => (
      characterSel.inRoot(action.id, state).id
    )),
    withState(state$),
    select(REMOVE_CHARACTER)
  )(action$);

  return mergeArray([
    compose(
      filter(Boolean),
      map(([state, {id}]) => (
        characterSel.inRoot(id, state).id.owner && fullCharacter(characterSel.inRoot(id, state))
      )),
      // chain(action => compose(
      //   map(state => ([state, action])),
      //   take(1)
      // )(state$)),
      withState(state$),
      select(CHANGE_CHARACTER)
    )(action$),
    compose(
      chain(([state, action]) => {
        if (action.id) {
          return _shareCharacter({id: action.id, owner: false}, action$);
        }
        else {
          if (!action._id) {
            action._id = createId();
          }
          return _shareCharacter({id: action._id, owner: true}, action$);
        }
      }),
      withState(state$),
      select(NEW_CHARACTER)
    )(action$),
    compose(
      chain(action => (
        tap(v => console.log(v), mergeArray(
          action.payload ?
            action.payload.characterSet
            .map(c => _shareCharacter(c.id, action$))
            .filter(s => (console.log(s), Boolean(s)))
            .concat(mostFrom(action.payload.characterSet.filter(c => c.id.owner).map(fullCharacter))) :
            []
        ))
      )),
      // filter(() => false),
      select(PERSIST_REHYDRATE)
    )(action$)
  ]);
};

export default shareCharacter;
