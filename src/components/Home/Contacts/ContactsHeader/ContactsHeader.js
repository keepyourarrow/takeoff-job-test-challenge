import React from "react";
import { AddContact } from "./AddContact";
import { SearchContacts } from "./SearchContacts";

export const ContactsHeader = ({ defaultContacts, contacts, dispatch }) => {
  return (
    <div className="mb-4 pl-6 pr-4 flex items-center space-x-4 xl:pr-12">
      <SearchContacts
        defaultContacts={defaultContacts}
        contacts={contacts}
        dispatch={dispatch}
      />
      <AddContact dispatch={dispatch} />
    </div>
  );
};
