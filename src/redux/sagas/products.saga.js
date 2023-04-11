import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* getProducts() {
  try {
    let response = yield axios.get("/api/products");
    yield put({ type: "SHOW_PRODUCT", payload: response.data });
  } catch (error) {
    console.log("error with element get request", error);
    yield put({ type: "FETCH_ERROR", payload: error });
  }
}

// worker Saga: will be fired on "REGISTER" actions
function* fetchProductByID(action) {
  try {
    const response = yield axios.get(`/api/products/${action.payload}`);
    yield put({ type: "SET_CURRENT_PRODUCT", payload: response.data });
  } catch (error) {
    console.log("Error with get product by ID:", error);
  }
}

// POST
function* postProduct(action) {
  console.log("in ADD", action.payload);
  try {
    yield axios.post("/api/products", { payload: action.payload });
    yield put({ type: "GET_PRODUCT" });
  } catch (error) {
    console.log("error with element get request", error);
    yield put({ type: "FETCH_ERROR", payload: error });
  }
}

function* productsSaga() {
  yield takeLatest("FETCH_PRODUCT_BY_ID", fetchProductByID);
  yield takeEvery("GET_PRODUCT", getProducts);
  yield takeEvery("ADD_PRODUCT", postProduct);
}

export default productsSaga;
