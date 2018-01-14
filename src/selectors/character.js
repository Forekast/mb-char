import {curry} from 'ramda';

export const inSet = curry((id, set) => set.find(c => c.id.code === id));
export const inRoot = curry((id, root) => inSet(id, root.characterSet));
export const overview = character => character ? character.overview : {};
export const name = character => character ? overview(character).name : '';
export const scores = character => character ? character.scores : {};
export const traits = character => character ? character.traits.traits : {};
export const burdens = character => character ? character.traits.burdens : [];
export const lore = character => character ? character.lore : {};
export const powers = character => character ? character.powers : [];
export const equipment = character => character ? character.equipment : [];

export const overviewInRoot = curry((id, root) => overview(inRoot(id, root)));
export const nameInRoot = curry((id, root) => name(inRoot(id, root)));
export const scoresInRoot = curry((id, root) => scores(inRoot(id, root)));
export const traitsInRoot = curry((id, root) => traits(inRoot(id, root)));
export const burdensInRoot = curry((id, root) => burdens(inRoot(id, root)));
export const loreInRoot = curry((id, root) => lore(inRoot(id, root)));
export const powersInRoot = curry((id, root) => powers(inRoot(id, root)));
export const equipmentInRoot = curry((id, root) => equipment(inRoot(id, root)));
