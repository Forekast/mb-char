import {
  UPDATE_CONNECTION,
  REMOVE_CONNECTION,
} from '../../constants/action-types';

const connections = (state = [], action) => {
  let index;
  switch (action.type) {
  case UPDATE_CONNECTION:
    index = state.findIndex(conn => conn.id === action.payload.id);
    if (index === -1) {
      return [].concat(
        state,
        action.payload
      );
    }
    else {
      return [].concat(
        state.slice(0, index),
        action.payload,
        state.slice(index + 1)
      );
    }
  case REMOVE_CONNECTION:
    index = state.findIndex(conn => conn.id === action.id);
    if (index !== -1) {
      return [].concat(
        state.slice(0, index),
        state.slice(index + 1)
      );
    }
  default:
    return state;
  }
};

export default connections;
