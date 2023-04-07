const currentStreamID = (state = "", action) => {
  switch (action.type) {
    case "SET_CURRENT_STREAM_ID":
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default currentStreamID;
