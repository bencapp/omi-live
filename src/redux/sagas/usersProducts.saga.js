import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

//
function* addProductToWishlist(action) {
  try {
    yield axios.post(`/api/users-products`, {
      productID: action.payload.productID,
    });
    // if product is not the current product, fetch current stream data
    // instead of fetch product by id.
    // fetch product by id also sets the product to the current product
    if (action.payload.current) {
      yield put({
        type: "FETCH_PRODUCT_BY_ID",
        payload: action.payload.productID,
      });
    } else {
      yield put({ type: "FETCH_CURRENT_STREAM_DATA" });
    }
  } catch (error) {
    console.log("Error with ADD PRODUCT TO WISHLIST:", error);
  }
}

function* removeProductFromWishlist(action) {
  try {
    yield axios.delete(`/api/users-products/${action.payload.productID}`);
    if (action.payload.current) {
      yield put({
        type: "FETCH_PRODUCT_BY_ID",
        payload: action.payload.productID,
      });
    } else {
      yield put({ type: "FETCH_CURRENT_STREAM_DATA" });
    }
  } catch (error) {
    console.log("Error with ADD PRODUCT TO WISHLIST:", error);
  }
}

function* usersProductsSaga() {
  yield takeEvery("ADD_PRODUCT_TO_WISHLIST", addProductToWishlist);
  yield takeEvery("REMOVE_PRODUCT_FROM_WISHLIST", removeProductFromWishlist);
}

export default usersProductsSaga;
