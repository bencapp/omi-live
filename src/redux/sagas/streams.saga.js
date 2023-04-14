import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* fetchStreams() {
  try {
    const response = yield axios.get("/api/streams");
    yield put({ type: "SET_STREAMS", payload: response.data });
  } catch (error) {
    console.log("Error with fetch streams saga:", error);
  }
}

function* fetchStreamByID(action) {
  try {
    const response = yield axios.get(`/api/streams/${action.payload.streamID}`);
    // set stream to the current stream reducer
    yield put({ type: "SET_CURRENT_STREAM", payload: response.data });
  } catch (error) {
    console.log("Error with fetch streams saga:", error);
  }
}

// this saga posts an empty stream to the database in preparation for the user to edit the stream in question
function* postEmptyStream(action) {
  try {
    const { history } = action.payload;
    const response = yield axios.post("/api/streams");
    yield put({ type: "SET_CURRENT_STREAM", payload: response.data });
    yield history.push("/edit-stream");
  } catch (error) {
    console.log("Error with post stream saga:", error);
  }
}

function* updateStreamInfo(action) {
  try {
    const response = yield axios.put(`/api/streams/${action.payload.id}`, {
      title: action.payload.title,
      description: action.payload.description,
      scheduled: action.payload.scheduled,
    });
    yield put({ type: "SET_CURRENT_STREAM", payload: response.data });
  } catch (error) {
    console.log("Error with put stream saga:", error);
  }
}

// type is either 'increase' or 'decrease'
function* orderChange(action) {
  try {
    yield axios.put(
      `/api/streams/order-change/${action.payload.currentStream.id}`,
      {
        productID: action.payload.productID,
        order: action.payload.order,
        type: action.payload.type,
      }
    );
    // TODO: fetch stream by ID after it has been updated
    const response = yield axios.get(
      `/api/streams/${action.payload.currentStream.id}`
    );
    console.log("changed order and got stream by id, response is", response);
    yield put({ type: "SET_CURRENT_STREAM", payload: response.data });
  } catch (error) {
    console.log("Error with order change stream saga:", error);
  }
}

// action.payload should be the stream ID to delete
function* deleteStream(action) {
  try {
    yield axios.delete(`/api/streams/${action.payload}`);
  } catch (error) {
    console.log("Error with delete stream saga:", error);
  }
}
function* streamsSaga() {
  yield takeEvery("FETCH_STREAMS", fetchStreams);
  yield takeEvery("FETCH_STREAM_BY_ID", fetchStreamByID);
  yield takeEvery("POST_EMPTY_STREAM", postEmptyStream);
  yield takeEvery("DELETE_STREAM", deleteStream);
  yield takeEvery("UPDATE_STREAM_INFO", updateStreamInfo);
  yield takeEvery("ORDER_CHANGE", orderChange);
}

export default streamsSaga;
