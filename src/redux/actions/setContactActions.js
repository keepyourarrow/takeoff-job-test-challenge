import { firebase, db } from "../../config/firebaseConfig";
import {
  CONTACT_CREATED_SUCCESS,
  CONTACT_DELETED_SUCCESS,
  DESELECT_ACTIVE_CONTACT,
  LOADING,
  UPDATE_FIELD_SUCCESS,
} from "./allActions";

export const createContact = (contact) => {
  return (dispatch) => {
    //firestore database reference, creating a new instance
    const dbRef = db.collection("contacts").doc();
    const contactID = dbRef.id;
    let modifiedContact = contact;

    // adding default photos, createdAt and id to match the firebase collection id
    modifiedContact.photo =
      "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png";
    modifiedContact.createdAt = new Date();
    modifiedContact.id = contactID;

    console.log(modifiedContact);

    //pushing it to firebase
    dbRef
      .set(modifiedContact)
      .then(() => {
        dispatch({ type: CONTACT_CREATED_SUCCESS });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteContact = () => {
  return (dispatch, getState) => {
    const currentID = getState().activeContact.activeContact.id;
    const currentName = getState().activeContact.activeContact.name;

    dispatch({
      type: LOADING,
      payload: `Deleting "${currentName}"...`,
    });
    db.collection("contacts")
      .doc(currentID)
      .delete()
      .then((res) => {
        dispatch({ type: DESELECT_ACTIVE_CONTACT });
        dispatch({
          type: CONTACT_DELETED_SUCCESS,
          payload: currentName,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const editContactField = (type, inputText) => {
  return (dispatch, getState) => {
    const currentID = getState().activeContact.activeContact.id;
    const updates = {};
    updates[type] = inputText;

    dispatch({ type: "LOADING", payload: `Updating ${type}...` });

    db.collection("contacts")
      .doc(currentID)
      .update(updates)
      .then((res) => {
        dispatch({ type: UPDATE_FIELD_SUCCESS, payload: type });
      })
      .catch((err) => console.log(err));
  };
};
