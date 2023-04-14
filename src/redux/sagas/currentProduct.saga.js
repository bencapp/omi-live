import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* fetchCurrentProductInStream() {
  try {
    const response = yield axios.get("/api/live-stream/current-product");
    yield put({ type: "SET_CURRENT_PRODUCT", payload: response.data });
  } catch (error) {
    console.log("Error with fetchCurrentProductInStream saga:", error);
  }
}

function* setCurrentProductInStream(action) {
  try {
    yield axios.put(
      `/api/live-stream/current-product/${action.payload.streamID}`,
      {
        product: action.payload.product,
      }
    );
    yield put({ type: "FETCH_CURRENT_PRODUCT_IN_STREAM" });
  } catch (error) {
    console.log("Error with setCurrentProductInStream saga:", error);
  }
}

// the samae as the fetch stream by ID saga, but this sets the
// current product to the first one in the order
function* fetchStreamOnStartStream(action) {
  try {
    const response = yield axios.get(`/api/streams/${action.payload.streamID}`);
    // set stream to the current stream reducer
    yield put({ type: "SET_CURRENT_STREAM", payload: response.data });
    // make the first product the first one in the order
    const firstProduct = response.data.products.find(
      (product) => product.order == 1
    );
    yield axios.put(
      `/api/live-stream/current-product/${action.payload.streamID}`,
      {
        product: firstProduct,
      }
    );
    yield put({ type: "SET_CURRENT_PRODUCT", payload: firstProduct });
  } catch (error) {
    console.log("Error with fetchStreamOnStartStream saga:", error);
  }
}

function* currentProductSaga() {
  yield takeEvery(
    "FETCH_CURRENT_PRODUCT_IN_STREAM",
    fetchCurrentProductInStream
  );
  yield takeEvery("SET_CURRENT_PRODUCT_IN_STREAM", setCurrentProductInStream);
  yield takeEvery("FETCH_STREAM_ON_START_STREAM", fetchStreamOnStartStream);
}

export default currentProductSaga;
