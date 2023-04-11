const streams = (state = [], action) => {
  switch (action.type) {
    case "SET_STREAMS":
      return action.payload;
    default:
      return state;
  }
};

export default streams;
