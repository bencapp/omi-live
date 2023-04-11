import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

//
function* addProductToWishlist(action) {
  try {
    yield axios.post(`/api/users-products`, {
      productID: action.payload,
    });
    yield put({
      type: "FETCH_PRODUCT_BY_ID",
      payload: action.payload,
    });
  } catch (error) {
    console.log("Error with ADD PRODUCT TO WISHLIST:", error);
  }
}

function* removeProductFromWishlist(action) {
  try {
    yield axios.delete(`/api/users-products/${action.payload}`);
    yield put({
      type: "FETCH_PRODUCT_BY_ID",
      payload: action.payload,
    });
  } catch (error) {
    console.log("Error with ADD PRODUCT TO WISHLIST:", error);
  }
}

function* usersProductsSaga() {
  yield takeEvery("ADD_PRODUCT_TO_WISHLIST", addProductToWishlist);
  yield takeEvery("REMOVE_PRODUCT_FROM_WISHLIST", removeProductFromWishlist);
}

export default usersProductsSaga;
