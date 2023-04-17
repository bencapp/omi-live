import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Nav from "../Nav/Nav";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AdminProtectedRoute from "../AdminProtectedRoute/AdminProtectedRoute";

import AboutPage from "../AboutPage/AboutPage";
import StreamView from "../ViewerComponents/StreamView/StreamView";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import StreamerHomePage from "../StreamerComponents/StreamerHomePage/StreamerHomePage";
import ViewerHomePage from "../ViewerComponents/ViewerHomePage/ViewerHomePage";
import EditStream from "../StreamerComponents/EditStream/EditStream";
import ProductDetail from "../ProductDetail/ProductDetail";
import EditProduct from "../StreamerComponents/AddEditProduct/EditProduct";
import AddProduct from "../StreamerComponents/AddEditProduct/AddProduct";
import ViewerProductsList from "../ViewerComponents/ViewerProductsList/ViewerProductsList";
import AddExistingProduct from "../StreamerComponents/AddExistingProduct/AddExistingProduct";
import StreamerControls from "../StreamerComponents/StreamerControls/StreamerControls";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <Router>
      <div>
        {/* If the user is logged in, display the nav bar */}
        {/* {user.id &&} */}

        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          {/* <Redirect exact from="/" to="/home" /> */}

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}

          <ProtectedRoute exact path="/live/:username">
            <StreamView />
          </ProtectedRoute>

          <ProtectedRoute exact path="/home">
            <Nav />
            {user.isAdmin ? <StreamerHomePage /> : <ViewerHomePage />}
          </ProtectedRoute>

          <AdminProtectedRoute exact path="/home/:view">
            <Nav />
            <StreamerHomePage />
          </AdminProtectedRoute>

          <ProtectedRoute exact path="/viewer-products">
            <Nav />
            {<ViewerProductsList />}
          </ProtectedRoute>

          {/* route for displaying all the information for a specific product.
          This route will render differently depending on whether the user is a streamer or a viewer  */}
          <ProtectedRoute exact path="/product/:productID">
            <Nav />
            <ProductDetail />
          </ProtectedRoute>

          <AdminProtectedRoute exact path="/edit-stream">
            <Nav />
            <EditStream />
          </AdminProtectedRoute>

          <AdminProtectedRoute exact path="/edit-stream/:streamID">
            <Nav />
            <EditStream />
          </AdminProtectedRoute>

          <AdminProtectedRoute exact path="/productform/:productID">
            <Nav />
            <EditProduct />
          </AdminProtectedRoute>

          <AdminProtectedRoute exact path="/productform/">
            <Nav />
            <AddProduct />
          </AdminProtectedRoute>

          {/* <AdminProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/add-product"
          >
            <Nav />

            <AddEditProduct />
          </AdminProtectedRoute>

          <AdminProtectedRoute
            // logged in shows InfoPage else shows LoginPage

            exact
            path="/edit-product/:productID"
          >
            <Nav />

            <AddEditProduct />
          </AdminProtectedRoute> */}

          <AdminProtectedRoute
            // logged in shows InfoPage else shows LoginPage

            exact
            path="/add-existing-product/:streamID"
          >
            <Nav />
            <AddExistingProduct />
          </AdminProtectedRoute>

          <AdminProtectedRoute
            // logged in shows InfoPage else shows LoginPage

            exact
            path="/streamer-stream/:streamID"
          >
            <StreamerControls />
          </AdminProtectedRoute>

          <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to="/home" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <Route exact path="/registration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/home" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>

          <Route exact path="/">
            {user.id ? <Redirect to="/home" /> : <LandingPage />}
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
