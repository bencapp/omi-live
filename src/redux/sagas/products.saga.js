import axios from "axios";
import { takeEvery, put } from "@redux-saga/core/effects";

// GET
function* getProducts() {
  try {
    let response = yield axios.get("/api/products");
    yield put({ type: "SHOW_PRODUCT", payload: response.data });
  } catch (error) {
    console.log("error with element get request", error);
    yield put({ type: "FETCH_ERROR", payload: error });
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

// function* postProduct(action) {
//   console.log("in ADD", action.payload);
//   yield axios({
//     method: "POST",
//     url: "/api/products",
//     data: action.payload,
//   });
// }

function* fetchProducts() {
  yield takeEvery("GET_PRODUCT", getProducts);
  yield takeEvery("ADD_PRODUCT", postProduct);
}

export default fetchProducts;
