import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* getProducts() {
  try {
    let response = yield axios.get("/api/products");
    yield put({ type: "SET_ALL_PRODUCTS", payload: response.data });
    console.log("prodiucst", response.data);
  } catch (error) {
    console.log("error with element get request", error);
    yield put({ type: "FETCH_ERROR", payload: error });
  }
}

// worker Saga: will be fired on "REGISTER" actions
function* fetchProductByID(action) {
  try {
    console.log("in fetch product by id, action.payload is", action.payload);
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

// DELETE route for streamer to remove a product from the DB
function* deleteProduct(action) {
  try {
    yield axios.delete(`/api/products/${action.payload}`);
  } catch (error) {
    console.log("error with element get request", error);
    yield put({ type: "FETCH_ERROR", payload: error });
  }
}

//UPDATE products 
function* updateProduct(action) {
  try {
    yield axios.put(`/api/products/${action.payload.id}`, action.payload);
    yield put({type: "GET_PRODUCT"})
  } catch (error) {
    console.log("error in product PUT", error); 
  }
}

function* updateProductPublicStatus(action) {
  try {
    yield axios.put(`/api/products/public/${action.payload.productID}`, {
      public: action.payload.public,
    });
  } catch (error) {
    console.log("error with product PUT public status request", error);
    yield put({ type: "FETCH_ERROR", payload: error });
  }
}

function* productsSaga() {
  yield takeEvery("FETCH_PRODUCT_BY_ID", fetchProductByID);
  yield takeEvery("GET_PRODUCT", getProducts);
  yield takeEvery("ADD_PRODUCT", postProduct);
  yield takeEvery("DELETE_PRODUCT", deleteProduct);
  yield takeEvery("UPDATE_PRODUCT", updateProduct);
  yield takeEvery("UPDATE_PRODUCT_PUBLIC_STATUS", updateProductPublicStatus);
}

export default productsSaga;
