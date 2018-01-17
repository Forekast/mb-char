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
  empty,
} from 'most';

import {character as characterSel} from '../selectors';
import {
  NEW_CHARACTER,
  CHANGE_CHARACTER,
  REMOVE_CHARACTER,
  FULL_CHARACTER,
  IMPORT_CHARACTER,
} from '../constants/action-types';
import {
  fullCharacter,

  updateConnection,
  removeConnection,
  online,
  offline,
} from '../actions';

const PERSIST_REHYDRATE = 'persist/REHYDRATE';

const HUB_ADDRESSES = [
  'https://signalhub-jccqtwhdwc.now.sh',
  // 'http://1.tcp.ngrok.io:23009',
  // 'http://localhost:8000',
];

const createId = () => (
  'xxxxxxxx'.replace(/x/g, () => (Math.random() * 36).toString(36)[0])
);

const swarms = {};

const map = curry(_map);
const observe = curry(_observe);
const chain = curry(_chain);
const take = curry(_take);
const filter = curry(_filter);
const tap = curry(_tap);

const characters = [];
const locals = [];
const remotes = [];

const hub = signalhub(`mistborn`, HUB_ADDRESSES);

let sw;

const _shareCharacter = (characterId, action$) => {
  console.log('_shareCharacter', characterId);
  if (
    characterId.owner &&
    characterId.code &&
    locals.indexOf(characterId.code) === -1
  ) {
    locals.push(characterId.code);
  }
  if (
    !characterId.owner &&
    characterId.code &&
    remotes.indexOf(characterId.code) === -1
  ) {
    remotes.push(characterId.code);
  }
  console.log(locals, remotes);

  if (swarms['all']) {return empty();}

  let character = null;
  let queue = [];
  let resolve = () => null;

  // const hub = signalhub(`mistborn-${characterId.code}`, HUB_ADDRESSES);

  const peerData = new Map();

  if (!sw) {
    let netTimeoutId = -1;

    sw = swarm(hub, {
      wrap(data, uid) {
        data.owns = locals;
        data.reads = remotes;
        return data;
      },
      unwrap(data, uid) {
        // Heard from hub
        queue.push(online());
        resolve();
        clearTimeout(netTimeoutId);
        netTimeoutId = setTimeout(
          () => {
            queue.push(offline());
            resolve();
          },
          20000
        );

        console.log(sw.me, data.from, uid, data.characters, locals, remotes);
        if (data.characters) {
          data.owns = data.characters;
          data.reads = [];
        }
        if (data.owns.find(cid => locals.indexOf(cid) !== -1)) {
          return data;
        }
        if (data.owns.find(cid => remotes.indexOf(cid) !== -1)) {
          peerData.set(data.from, {
            owns: data.owns,
            reads: data.reads,
          });
          if (swarm.remotes[data.from]) {
            queue.push(updateConnection({
              id: data.from,
              owns: data.owns,
              reads: data.reads,
            }));
            resolve();
          }
          return data;
        }
        if (data.reads.find(cid => locals.indexOf(cid) !== -1)) {
          peerData.set(data.from, {
            owns: data.owns,
            reads: data.reads,
          });
          if (swarm.remotes[data.from]) {
            queue.push(updateConnection({
              id: data.from,
              owns: data.owns,
              reads: data.reads,
            }));
            resolve();
          }
          return data;
        }
      },
    });
  }

  console.log('share', characterId.code);

  sw.on('peer', function (peer, id) {
    console.log('connected to a new peer:', id);
    console.log('total peers:', sw.peers.length);
    console.dir(peer);
    console.log(characterId, character);
    console.log(characters);
    const data = peerData.get(id);
    if (data) {
      queue.push(updateConnection({
        id,
        owns: data.owns,
        reads: data.reads,
      }));
      resolve();
    }
    for (const character of characters) {
      console.log(character);
      console.log('send', character.type);
      peer.send(JSON.stringify(character));
    }
    // if (characterId.owner && character) {
    //   peer.send(JSON.stringify(character));
    // }

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

    queue.push(removeConnection(id));
    resolve();
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

  swarms['all'] = sw;

  console.log('1');

  compose(
    observe(action => {
      console.log(FULL_CHARACTER, action);
      if (action.remote) {return;}
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
      if (!action.remote || locals.indexOf(action.id) !== -1) {
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

const _stopShare = ({id}) => {
  if (!swarms[id.code]) {return;}
  // swarms[id.code].close();
  swarms[id.code] = null;
};

const restart = () => {
  // if (!swarms['all']) {return;}
  // swarms['all'].close();
  // swarms['all'] = null;
  if (swarms.all) {
    for (const peer of swarms.all.peers) {
      peer.destroy();
    }
  }
};

const shareCharacter = (action$, state$) => {
  compose(
    observe(_stopShare),
    // map(([state, action]) => (
    //   characterSel.inRoot(action.id, state).id
    // )),
    // withState(state$),
    select(REMOVE_CHARACTER)
  )(action$);

  return mergeArray([
    compose(
      filter(Boolean),
      map(([state, {id}]) => (
        characterSel.inRoot(id, state).id.owner &&
          fullCharacter(characterSel.inRoot(id, state))
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
        restart();
        if (action.id) {
          return _shareCharacter({code: action.id, owner: false}, action$);
        }
        else {
          if (!action._id) {
            action._id = createId();
          }
          return _shareCharacter({code: action._id, owner: true}, action$);
        }
      }),
      withState(state$),
      select(NEW_CHARACTER)
    )(action$),
    compose(
      chain(([state, action]) => {
        restart();
        if (!action._id) {
          action._id = createId();
        }
        return _shareCharacter({code: action._id, owner: true}, action$);
      }),
      withState(state$),
      select(IMPORT_CHARACTER)
    )(action$),
    compose(
      chain(action => (
        tap(v => console.log(v), mergeArray(
          action.payload ?
            action.payload.characterSet
            .map(c => _shareCharacter(c.id, action$))
            .filter(s => (console.log(s), Boolean(s)))
            .concat(mostFrom(
              action.payload.characterSet
              .filter(c => c.id.owner)
              .map(fullCharacter)
            )) :
            []
        ))
      )),
      // filter(() => false),
      select(PERSIST_REHYDRATE)
    )(action$)
  ]);
};

export default shareCharacter;
