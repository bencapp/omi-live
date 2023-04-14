import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* fetchCurrentProductInStream() {
  try {
    const response = yield axios.get("/api/current-product");
    yield put({ type: "SET_CURRENT_PRODUCT", payload: response });
  } catch (error) {
    console.log("Error with fetchCurrentProductInStream saga:", error);
  }
}

function* setCurrentProductInStream(action) {
  try {
    const response = yield axios.post("/api/current-product", {
      product: action.payload.product,
      streamID: action.payload.streamID,
    });
  } catch (error) {
    console.log("Error with setCurrentProductInStream saga:", error);
  }
}

function* currentProductSaga() {
  yield takeEvery(
    "FETCH_CURRENT_PRODUCT_IN_STREAM",
    fetchCurrentProductInStream
  );
  yield takeEvery("SET_CURRENT_PRODUCT_IN_STREAM", setCurrentProductInStream);
}

export default currentProductSaga;
