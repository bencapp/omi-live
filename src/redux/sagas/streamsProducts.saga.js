import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

// returns true or false for whether the relationship exists
function* fetchProductInStream(action) {
  try {
    const response = yield axios.get(
      `/api/streams-products/${action.payload.streamID}/${action.payload.productID}`
    );
    yield put({ type: "SET_PRODUCT_IN_STREAM", payload: response.data });
  } catch (error) {
    console.log("Error with fetchProductInStream saga:", error);
  }
}

function* removeProductFromStream(action) {
  try {

    const response = yield axios.delete(
      `/api/streams-products/${action.payload.streamID}/${action.payload.productID}`
    );
    yield put({ type: "SET_PRODUCT_IN_STREAM", payload: response.data });
    yield put({type: "FETCH_STREAM_BY_ID", payload: action.payload})
  } catch (error) {
    console.log("Error with removeProductFromStream saga:", error);
  }
}

function* addProductToStream(action) {
  try {
    yield axios.post("/api/streams-products", {
      streamID: action.payload.streamID,
      productID: action.payload.productID,
    });
    yield put({ type: "SET_PRODUCT_IN_STREAM", payload: true });
    yield put({type: "FETCH_STREAM_BY_ID", payload: action.payload})
  } catch (error) {
    console.log("Error with addProductToStream saga:", error);
  }
}

function* streamsProductsSaga() {
  yield takeEvery("FETCH_PRODUCT_IN_STREAM", fetchProductInStream);
  yield takeEvery("REMOVE_PRODUCT_FROM_STREAM", removeProductFromStream);
  yield takeEvery("ADD_PRODUCT_TO_STREAM", addProductToStream);
}

export default streamsProductsSaga;
