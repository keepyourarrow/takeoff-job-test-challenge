import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

import { notificationsReducer } from "./notificationsReducer";
import { authReducer } from "./authReducer";
import { contactsReducer } from "./contactsReducer";
import { activeContactReducer } from "./activeContactReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  contacts: contactsReducer,
  activeContact: activeContactReducer,
  notifications: notificationsReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});
