import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// worker Saga: will be fired on "REGISTER" actions
function* fetchProductByID(action) {
  try {
    const response = yield axios.get(`/api/products/${action.payload}`);
    yield put({ type: "SET_CURRENT_PRODUCT", payload: response.data });
  } catch (error) {
    console.log("Error with get product by ID:", error);
  }
}

function* productsSaga() {
  yield takeLatest("FETCH_PRODUCT_BY_ID", fetchProductByID);
}

export default productsSaga;
