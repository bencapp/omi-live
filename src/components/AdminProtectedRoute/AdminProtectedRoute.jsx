import React from "react";
import { Route, Redirect } from "react-router-dom";
import LoginPage from "../LoginPage/LoginPage";
import { useSelector } from "react-redux";

import ViewerHomePage from "../ViewerComponents/ViewerHomePage/ViewerHomePage";

// A Custom Wrapper Component -- This will keep our code DRY.
// Responsible for watching redux state, and returning an appropriate component
// API for this component is the same as a regular route

function AdminProtectedRoute({ component, children, ...props }) {
  const user = useSelector((store) => store.user);

  // Component may be passed in as a "component" prop,
  // or as a child component.
  const ProtectedComponent = component || (() => children);

  // We return a Route component that gets added to our list of routes
  return (
    <Route
      // all props like 'exact' and 'path' that were passed in
      // are now passed along to the 'Route' Component
      {...props}
    >
      {user.id && user.isAdmin ? (
        // If the user is logged in and is the admin, show the protected component
        <ProtectedComponent />
      ) : user.id ? (
        // If the user is logged in but is not the admin, show the viewer home page
        <ViewerHomePage />
      ) : (
        // Otherwise, redirect to the Loginpage
        <LoginPage />
      )}
    </Route>
  );
}

export default AdminProtectedRoute;
