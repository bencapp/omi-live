import { combineReducers } from 'redux';

const streams = (state = [], action) => {
  switch (action.type) {
    case "SET_STREAMS":
      return action.payload;
    default:
      return state;
  }
};

const activeStreams = (state = 0, action) => {
  switch (action.type) {
    case "SET_ACTIVE_STREAMS":
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({streams, activeStreams});
