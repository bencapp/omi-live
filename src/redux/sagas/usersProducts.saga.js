import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

//
function* addProductToWishlist(action) {
  try {
    yield axios.post(`/api/users-products`, {
      productID: action.payload.productID,
      userID: action.payload.userID,
    });
  } catch (error) {
    console.log("Error with ADD PRODUCT TO WISHLIST:", error);
  }
}

function* usersProductsSaga() {
  yield takeLatest("ADD_PRODUCT_TO_WISHLIST", addProductToWishlist);
}

export default usersProductsSaga;
