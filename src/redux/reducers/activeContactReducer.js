import {
  DESELECT_ACTIVE_CONTACT,
  SELECT_ACTIVE_CONTACT,
} from "../actions/allActions";

const initState = {
  activeContact: {},
};

export const activeContactReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SELECT_ACTIVE_CONTACT:
      return { activeContact: payload };

    case DESELECT_ACTIVE_CONTACT:
      return { activeContact: {} };
    default:
      return state;
  }
};
