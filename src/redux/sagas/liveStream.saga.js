import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

// this should return the entire stream data with all the products,
// as well as the 'on_user_wishlist' boolean for the current user
// and the current product
function* fetchCurrentStreamData() {
  try {
    const response = yield axios.get("/api/live-stream");
    // now set the current stream reducer
    yield put({ type: "SET_CURRENT_STREAM", payload: response.data });
    // then fetch the current product in the stream
    const products = response.data.products;
    const currentProduct = products.find(
      (product) => product.id == response.data.currentProduct.id
    );
    yield put({
      type: "SET_CURRENT_PRODUCT",
      payload: currentProduct,
    });
  } catch (error) {
    console.log("Error with fetchCurrentStreamData saga:", error);
  }
}

// returns just the current product that is cached on the server
function* fetchCurrentProductInStream() {
  try {
    const response = yield axios.get("/api/live-stream/current-product");
    yield put({
      type: "SET_CURRENT_PRODUCT",
      payload: response.data,
    });
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

function* startStream(action) {
  try {
    yield axios.put(`/api/live-stream/start-stream/${action.payload}`);
  } catch (error) {
    console.error("Error starting stream:", error);
  }
}

// payload should be streamID to end
function* endStream(action) {
  try {
    yield axios.put(`/api/live-stream/end-stream/${action.payload}`);
  } catch (error) {
    console.log("Error with endStream saga:", error);
  }
}

function* fetchActiveStreams() {
  try {
    let response = yield axios.get(`api/live-stream/active`);
    yield put({ type: "SET_ACTIVE_STREAMS", payload: response.data });
  } catch (error) {
    console.error(error);
  }
}

function* liveStreamSaga() {
  yield takeEvery("FETCH_CURRENT_STREAM_DATA", fetchCurrentStreamData);
  yield takeEvery(
    "FETCH_CURRENT_PRODUCT_IN_STREAM",
    fetchCurrentProductInStream
  );
  yield takeEvery("FETCH_ACTIVE_STREAMS", fetchActiveStreams);
  yield takeEvery("START_STREAM", startStream);
  yield takeEvery("SET_CURRENT_PRODUCT_IN_STREAM", setCurrentProductInStream);
  yield takeEvery("FETCH_STREAM_ON_START_STREAM", fetchStreamOnStartStream);
  yield takeEvery("END_STREAM", endStream);
}

export default liveStreamSaga;
