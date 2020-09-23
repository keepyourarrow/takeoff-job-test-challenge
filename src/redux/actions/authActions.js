import { db, firebase } from "../../config/firebaseConfig";

import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  SIGNOUT_SUCCESS,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
} from "./allActions";

export const signIn = (credentials) => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: LOGIN_SUCCESS });
      })
      .catch((err) => dispatch({ type: LOGIN_ERROR, err }));
  };
};

export const signUp = (newUser) => {
  console.log(newUser, "new User");
  let initials =
    newUser.firstName.substring(0, 1) + newUser.lastName.substring(0, 1);
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((res) => {
        return db
          .collection("users")
          .doc(res.user.uid)
          .set({
            email: newUser.email,
            userName: newUser.firstName + " " + newUser.lastName,
            initials: initials,
          })
          .then(() => dispatch({ type: SIGNUP_SUCCESS }));
      })
      .catch((err) => dispatch({ type: SIGNUP_ERROR, err }));
  };
};

export const getGoogleAuthData = (user) => {
  return (dispatch) => {
    const usersRef = db.collection("users").doc(user.uid);

    usersRef.get().then((docSnapshot) => {
      if (docSnapshot.exists) {
        return;
      } else {
        if (user.displayName != null) {
          console.log(user);
          let initials = user.displayName.match(/\b\w/g) || [];
          initials = (
            (initials.shift() || "") + (initials.pop() || "")
          ).toUpperCase();
          usersRef
            .set({
              userName: user.displayName,
              userEmail: user.email,
              initials,
            })
            .then(() => {
              dispatch({ type: SIGNUP_SUCCESS });
            })
            .catch((err) => dispatch({ type: SIGNUP_ERROR }));
        }
      }
    });
  };
};

export const signOut = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: SIGNOUT_SUCCESS });
      });
  };
};
