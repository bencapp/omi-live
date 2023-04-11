const addProduct = (state = [], action) => {
  if (action.type === "SHOW_PRODUCT") {
    return [...state, action.payload];
  }
  return state;
};

export default addProduct;
