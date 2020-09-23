import {
  LOGIN_SUCCESS,
  SIGNOUT_SUCCESS,
  SIGNUP_SUCCESS,
  REMOVE_NOTIFICATION,
  CONTACT_CREATED_SUCCESS,
  CONTACT_DELETED_SUCCESS,
  UPDATE_FIELD_SUCCESS,
  LOADING,
} from "../actions/allActions";

const initState = {
  message: "",
  error: false,
  loadingMessage: "",
};

export const notificationsReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SIGNUP_SUCCESS:
      return { message: "Signup Successful" };

    case LOGIN_SUCCESS:
      return { message: "Login Succesful!" };

    case SIGNOUT_SUCCESS:
      return { message: "Successfully signed out!" };

    case CONTACT_CREATED_SUCCESS:
      return { message: "Sucessfully created a new contact!" };

    case CONTACT_DELETED_SUCCESS:
      return { message: `Sucessfully deleted ${payload}` };

    case UPDATE_FIELD_SUCCESS:
      return { message: `Sucessfully updated ${payload}` };
    case LOADING:
      return { loading: payload };

    case REMOVE_NOTIFICATION:
      return { message: "", error: false };

    default:
      return state;
  }
};
