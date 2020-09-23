import {
  FILTER_CONTACTS,
  SET_SELECTED_ACTIVE,
  SET_FILTERED_CONTACTS,
} from "../actions/allActions";

const initState = {
  defaultData: [],
  filteredContacts: [],
};

export const contactsReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_FILTERED_CONTACTS:
      // we are adding active in order to switch between different contacts
      let set_active = payload.map((contact) => {
        return { ...contact, active: false };
      });
      return {
        ...state,
        filteredContacts: set_active,
        defaultData: set_active,
      };

    // to show that rooms has been selected
    case SET_SELECTED_ACTIVE:
      let newContacts = state.filteredContacts.map((contact) => {
        if (contact.id === payload.id) {
          let active = (contact.active = true);
          return { ...contact, active };
        }
        return { ...contact, active: false };
      });
      return { ...state, filteredContacts: newContacts };

    //for searching
    case FILTER_CONTACTS:
      const tempContacts = state.defaultData.filter((contact) => {
        return contact.name.toLowerCase().includes(payload.toLowerCase());
      });
      return { ...state, filteredContacts: tempContacts };

    default:
      return state;
  }
};
