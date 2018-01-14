import {
  NEW_CHARACTER,
  CHANGE_CHARACTER,
  REMOVE_CHARACTER,
  FULL_CHARACTER,

  NEW_CHARACTER_BURDEN,
  CHANGE_CHARACTER_BURDEN,
  REMOVE_CHARACTER_BURDEN,

  NEW_CHARACTER_POWER,
  CHANGE_CHARACTER_POWER,
  REMOVE_CHARACTER_POWER,

  NEW_CHARACTER_STUNT,
  CHANGE_CHARACTER_STUNT,
  REMOVE_CHARACTER_STUNT,

  NEW_CHARACTER_EQUIPMENT,
  CHANGE_CHARACTER_EQUIPMENT,
  REMOVE_CHARACTER_EQUIPMENT,
} from '../constants/action-types';

export const newCharacter = ({id, name}) => {
  return {
    type: NEW_CHARACTER,
    id,
    name,
  };
};

export const changeCharacter = ({id, character, key}, value) => {
  return {
    type: CHANGE_CHARACTER,
    id: id || character.id.code,
    key,
    value,
  };
};

export const removeCharacter = ({id, character}) => {
  return {
    type: REMOVE_CHARACTER,
    id: id || character.id.code,
  };
};

export const fullCharacter = character => {
  return {
    type: FULL_CHARACTER,
    id: character.id.code,
    character: {
      id: {
        code: character.id.code,
        owner: false,
      },
      overview: character.overview,
      scores: character.scores,
      traits: character.traits,
      powers: character.powers,
      equipment: character.equipment,
      lore: character.lore,
    },
  };
};

export const newCharacterBurden = ({id, character}) => {
  return {
    type: CHANGE_CHARACTER,
    subtype: NEW_CHARACTER_BURDEN,
    id: id || character.id.code,
  };
};

export const changeCharacterBurden = ({id, character}, key, value) => {
  return {
    type: CHANGE_CHARACTER,
    subtype: CHANGE_CHARACTER_BURDEN,
    id: id || character.id.code,
    key,
    value,
  };
};

export const removeCharacterBurden = ({id, character}, key) => {
  return {
    type: CHANGE_CHARACTER,
    subtype: REMOVE_CHARACTER_BURDEN,
    id: id || character.id.code,
    key,
  };
};

export const newCharacterPower = ({id, character}) => {
  return {
    type: CHANGE_CHARACTER,
    subtype: NEW_CHARACTER_POWER,
    id: id || character.id.code,
  };
};

export const changeCharacterPower = ({id, character, key, subkey}, value) => {
  return {
    type: CHANGE_CHARACTER,
    subtype: CHANGE_CHARACTER_POWER,
    id: id || character.id.code,
    key,
    subkey,
    value,
  };
};

export const removeCharacterPower = ({id, character}, key) => {
  return {
    type: CHANGE_CHARACTER,
    subtype: REMOVE_CHARACTER_POWER,
    id: id || character.id.code,
    key,
  };
};

export const newCharacterStunt = ({id, character}, key) => {
  return {
    type: CHANGE_CHARACTER,
    subtype: NEW_CHARACTER_STUNT,
    id: id || character.id.code,
    key,
  };
};

export const changeCharacterStunt = ({id, character}, key, subkey, value) => {
  return {
    type: CHANGE_CHARACTER,
    subtype: CHANGE_CHARACTER_STUNT,
    id: id || character.id.code,
    key,
    subkey,
    value,
  };
};

export const removeCharacterStunt = ({id, character}, key, subkey) => {
  return {
    type: CHANGE_CHARACTER,
    subtype: REMOVE_CHARACTER_STUNT,
    id: id || character.id.code,
    key,
    subkey,
  };
};

export const newCharacterEquipment = ({id, character}) => {
  return {
    type: CHANGE_CHARACTER,
    subtype: NEW_CHARACTER_EQUIPMENT,
    id: id || character.id.code,
  };
};

export const changeCharacterEquipment = ({id, character, subkey}, key, value) => {
  return {
    type: CHANGE_CHARACTER,
    subtype: CHANGE_CHARACTER_EQUIPMENT,
    id: id || character.id.code,
    key,
    subkey,
    value,
  };
};

export const removeCharacterEquipment = ({id, character}, key) => {
  return {
    type: CHANGE_CHARACTER,
    subtype: REMOVE_CHARACTER_EQUIPMENT,
    id: id || character.id.code,
    key,
  };
};
