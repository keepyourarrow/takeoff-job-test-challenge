import * as serviceWorker from "./serviceWorker";
import React from "react";
import ReactDOM from "react-dom";
import { Provider, useSelector } from "react-redux";

import { store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { createFirestoreInstance } from "redux-firestore";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import firebase from "firebase/app";

import "./assets/css/index.css";
import App from "./App";
import { LoadingGifSVG } from "./assets/LoadingGif";

// for firebase
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};
const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

// to show everything only when we are connected to firebase Auth
function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  //show loading spinner
  if (!auth.isLoaded)
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <LoadingGifSVG className="w-24 h-24 text-gray-700" />
      </div>
    );
  return children;
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <BrowserRouter>
        <AuthIsLoaded>
          <App />
        </AuthIsLoaded>
      </BrowserRouter>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
