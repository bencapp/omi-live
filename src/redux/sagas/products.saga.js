import axios from "axios";
import { takeEvery, put } from "@redux-saga/core/effects";

// GET
function* products() {
  try {
    let response = yield axios.get("/api/products");
    yield put({ type: "ADD_PRODUCTS", payload: response.data });
  } catch (error) {
    console.log("error with element get request", error);
    yield put({ type: "FETCH_ERROR", payload: error });
  }
}

// POST
function* postProduct(action) {
  console.log("in ADD", action.payload);
  yield axios({
    method: "POST",
    url: "/api/products",
    data: action.payload,
  });
}

function* fetchProducts() {
  yield takeEvery("GET_PRODUCTS", products);
  yield takeEvery("POST_PRODUCTS", postProduct);
}

export default fetchProducts;