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

// this saga posts an empty stream to the database in preparation for the user to edit the stream in question
function* postEmptyStream(action) {
  try {
    const { history } = action.payload;
    const response = yield axios.post("/api/streams");
    yield put({ type: "SET_CURRENT_STREAM_ID", payload: response.data });
    yield history.push("/edit-stream");
  } catch (error) {
    console.log("Error with post stream saga:", error);
  }
}

function* streamsSaga() {
  yield takeEvery("FETCH_STREAMS", fetchStreams);
  yield takeEvery("POST_EMPTY_STREAM", postEmptyStream);
}

export default streamsSaga;
