const currentProduct = (state = {}, action) => {
  switch (action.type) {
    case "SET_CURRENT_PRODUCT":
      return {
        ...state,
        name: action.payload.name,
        image_url: action.payload.image_url,
        description: action.payload.description,
        coupon_code: action.payload.coupon_code,
        coupon_expiration: action.payload.coupon_expiration,
        url: action.payload.url,
        on_user_wishlist: action.payload.on_user_wishlist,
      };
    case "SET_PRODUCT_IN_STREAM":
      return { ...state, inCurrentStream: action.payload };
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default currentProduct;
