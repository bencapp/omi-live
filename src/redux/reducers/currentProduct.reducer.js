const currentProduct = (state = {}, action) => {
  switch (action.type) {
    case "SET_CURRENT_PRODUCT":
      return {
        //action.payload
        ...state, ...action.payload,
      };
    case "SET_PRODUCT_IN_STREAM":
      return { ...state, inCurrentStream: action.payload };
    case "SET_CURRENT_PRODUCT_ORDER":
      return { ...state, order: action.payload };
    case "UNSET_CURRENT_PRODUCT":
      return {};

    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default currentProduct;
