const allProducts = (state = [], action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return [...state, action.payload];
    case "SET_ALL_PRODUCTS":
      return action.payload;
    default:
      return state;
  }
};

export default allProducts;
