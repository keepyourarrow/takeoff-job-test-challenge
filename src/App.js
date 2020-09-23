import React, { useEffect } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import RouteGuarding from "./pages/RouteGuarding";
import SignupPage from "./pages/SignupPage";
import { useDispatch, useSelector } from "react-redux";
import { Notifications } from "./components/reusable/Notifications";
import { AnimatePresence } from "framer-motion";
import { LoadingGifSVG } from "./assets/LoadingGif";

function App() {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.notifications.message);
  const loading = useSelector((state) => state.notifications.loading);

  useEffect(() => {
    //remove notification
    if (message) {
      setTimeout(() => {
        dispatch({ type: "REMOVE_NOTIFICATION" });
      }, 5000);
    }
  }, [message]);
  return (
    <>
      {/* loading message */}
      {loading && (
        <Notifications message={loading}>
          <LoadingGifSVG className="w-10 h-10" />
        </Notifications>
      )}
      {/* notification message */}
      <AnimatePresence>
        {message && <Notifications message={message} />}
      </AnimatePresence>

      <BrowserRouter>
        <Switch>
          <RouteGuarding
            path="/signup"
            component={SignupPage}
            forLoggedInUsers={false}
          />
          <RouteGuarding
            path="/"
            component={HomePage}
            forLoggedInUsers={true}
          />
          <Route component={ErrorPage} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
