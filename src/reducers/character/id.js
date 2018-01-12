import {NEW_CHARACTER} from '../../constants/action-types';

const createId = () => (
  'xxxxxxxx'.replace(/x/g, () => (Math.random() * 36).toString(36)[0])
);

const id = (state = {}, action) => {
  switch (action.type) {
  case NEW_CHARACTER:
    return {
      code: action.id ? action.id.code : createId(),
    };
  default:
    return state;
  }
};

export default id;
