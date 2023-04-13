import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* chatSaga () {
    yield takeEvery('GET_CHAT', getChat)
    yield takeEvery('POST_CHAT', postChat)
}

function* getChat() {
    try {
        const chat = yield axios.get(`/api/chat`); 
        console.log("in get saga - chat from database:", chat.data)
        yield put({type: 'SET_CHAT', payload: chat.data})
    } catch (error) {
        console.log('error in getChat saga', error);
    }
}

function* postChat(action) {
    try {
        yield axios.post(`/api/chat`, {payload: action.payload});
        yield put({type:'GET_CHAT'})
    } catch (error) {
        console.log("Error in postChat saga:", error);
    }
}

export default chatSaga; 