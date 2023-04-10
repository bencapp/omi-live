const addProduct = (state = [], action) => {
  if (action.type === "ADD_PRODUCT") {
    return [...state, action.payload];
  }
  return state;
};

export default addProduct;
