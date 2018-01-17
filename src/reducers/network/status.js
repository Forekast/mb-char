import {
  ONLINE,
  OFFLINE,
} from '../../constants/action-types';

const status = (state = {}, action) => {
  switch (action.type) {
  case ONLINE:
    return {
      state: ONLINE,
    };
  case OFFLINE:
    return {
      state: OFFLINE,
    };
  default:
    return state;
  }
};

export default status;
