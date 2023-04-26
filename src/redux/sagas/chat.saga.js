import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* chatSaga() {
  yield takeEvery("GET_CHAT", getChat);
  yield takeEvery("POST_CHAT", postChat);
  yield takeEvery("DELETE_CHAT", deleteChat);
  yield takeEvery("START_CHAT_DEMO", startChatDemo);
}

function* getChat() {
  try {
    const chat = yield axios.get(`/api/chat`);
    yield put({ type: "SET_CHAT", payload: chat.data });
  } catch (error) {
    console.log("error in getChat saga", error);
  }
}

function* postChat(action) {
  try {
    yield axios.post(`/api/chat`, { payload: action.payload });
    yield put({ type: "GET_CHAT" });
    yield action.callback();
  } catch (error) {
    console.log("Error in postChat saga:", error);
  }
}

function* deleteChat(action) {
  try {
    yield axios.delete(`/api/chat/${action.payload}`);
    yield put({ type: "GET_CHAT" });
  } catch (error) {
    console.log(error);
  }
}

function* startChatDemo() {
  try {
    yield axios.get("/api/chat/start-demo");
  } catch (error) {
    console.log(error);
  }
}

export default chatSaga;
