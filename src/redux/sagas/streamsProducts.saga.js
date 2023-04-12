import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

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
  yield takeEvery("REMOVE_PRODUCT_FROM_STREAM", removeProductFromStream);
}

export default streamsProductsSaga;
