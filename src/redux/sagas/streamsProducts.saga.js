import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

// returns true or false for whether the relationship exists
function* fetchProductInStream(action) {
  try {
    console.log("fetching product in stream, action.payload:", action.payload);
    const response = yield axios.get("/api/streams-products", {
      payload: action.payload,
    });
    yield put({ type: "SET_PRODUCT_IN_STREAM", payload: response.data });
  } catch (error) {
    console.log("Error with fetchProductInStream saga:", error);
  }
}

function* removeProductFromStream(action) {
  try {
    console.log(
      "in remove from stream saga, action.payload is",
      action.payload
    );
    yield axios.delete(
      `/api/streams-products/${action.payload.streamID}/${action.payload.productID}`
    );
  } catch (error) {
    console.log("Error with removeProductFromStream saga:", error);
  }
}

function* streamsProductsSaga() {
  yield takeEvery("FETCH_PRODUCT_IN_STREAM", fetchProductInStream);
  yield takeEvery("REMOVE_PRODUCT_FROM_STREAM", removeProductFromStream);
}

export default streamsProductsSaga;
