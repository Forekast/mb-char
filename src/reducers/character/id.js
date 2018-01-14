import {NEW_CHARACTER} from '../../constants/action-types';

const createId = () => (
  'xxxxxxxx'.replace(/x/g, () => (Math.random() * 36).toString(36)[0])
);

const id = (state = {}, action) => {
  switch (action.type) {
  case NEW_CHARACTER:
    if (!action.id && !action._id) {
      action._id = createId();
    }
    return {
      code: typeof action.id !== 'undefined' ? action.id : action._id,
      owner: typeof action.id !== 'undefined' ? false : true,
    };
  default:
    return state;
  }
};

export default id;
