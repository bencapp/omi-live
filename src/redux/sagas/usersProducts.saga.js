import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* switchDispatchAfterUpdate(envType, productID) {
  // if product is not the current product, fetch current stream data
  // instead of fetch product by id.
  // fetch product by id also sets the product to the current product
  switch (envType) {
    case "product-detail":
      yield put({
        type: "FETCH_PRODUCT_BY_ID",
        payload: productID,
      });
      break;
    case "product-list":
      yield put({ type: "GET_PRODUCTS" });
      break;
    case "stream-overlay":
      yield put({ type: "FETCH_CURRENT_STREAM_DATA" });
      break;
    default:
      break;
  }
}

function* addProductToWishlist(action) {
  try {
    yield axios.post(`/api/users-products`, {
      productID: action.payload.productID,
    });

    yield switchDispatchAfterUpdate(
      action.payload.envType,
      action.payload.productID
    );
  } catch (error) {
    console.log("Error with ADD PRODUCT TO WISHLIST:", error);
  }
}

function* removeProductFromWishlist(action) {
  try {
    yield axios.delete(`/api/users-products/${action.payload.productID}`);
    yield switchDispatchAfterUpdate(
      action.payload.envType,
      action.payload.productID
    );
  } catch (error) {
    console.log("Error with ADD PRODUCT TO WISHLIST:", error);
  }
}

function* usersProductsSaga() {
  yield takeEvery("ADD_PRODUCT_TO_WISHLIST", addProductToWishlist);
  yield takeEvery("REMOVE_PRODUCT_FROM_WISHLIST", removeProductFromWishlist);
}

export default usersProductsSaga;
