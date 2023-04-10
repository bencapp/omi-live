// stream data format:
// {id, title, scheduled}

const currentStream = (state = "", action) => {
  switch (action.type) {
    case "SET_CURRENT_STREAM":
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default currentStream;
