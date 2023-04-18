const wishlist = (state = {}, action) => {
  switch (action.type) {
    case "TOGGLE_WISHLIST":
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default wishlist;
