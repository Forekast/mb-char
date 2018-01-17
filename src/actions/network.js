import {
  UPDATE_CONNECTION,
  REMOVE_CONNECTION,
  ONLINE,
  OFFLINE,
} from '../constants/action-types';

export const updateConnection = payload => {
  return {
    type: UPDATE_CONNECTION,
    payload,
  };
};

export const removeConnection = id => {
  return {
    type: REMOVE_CONNECTION,
    id,
  };
};

export const online = () => {
  return {
    type: ONLINE,
  };
};

export const offline = () => {
  return {
    type: OFFLINE,
  };
};
