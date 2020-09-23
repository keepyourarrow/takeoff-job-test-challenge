import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const RouteGuarding = ({ component: Component, path, forLoggedInUsers }) => {
  const notLoggedIn = useSelector((state) => state.firebase.auth.isEmpty);
  // if loggedIn is false we are logged in

  //if forLoggedInUser is true then we want ONLY authorized users to access it if not we get redirected to signin page
  // if forLoggedInUser is false (else statement) then we only want UNAUTHORIZED users to access it and redirect others.
  if (forLoggedInUsers) {
    if (notLoggedIn) {
      return <Redirect to="/signup" />;
    }
  } else {
    if (!notLoggedIn) {
      return <Redirect to="/" />;
    }
  }
  return <Route exact path={path} component={Component} />;
};

export default RouteGuarding;
