import {
  SearchCircleOutline,
  SearchCircleSolid,
  SearchSolid,
} from "@graywolfai/react-heroicons";
import React, { useEffect, useState } from "react";

export const SearchContacts = ({ contacts, dispatch }) => {
  const [contactsLength, setContactsLength] = useState(0);
  useEffect(() => {
    if (contacts) {
      setContactsLength(contacts.length);
    }
  }, [contacts]);

  const handleChange = (e) => {
    //contacts reducer
    dispatch({ type: "FILTER_CONTACTS", payload: e.target.value });
  };
  return (
    <div className="relative">
      <span className="absolute top-0 ml-2 mt-2 text-gray-600">
        <SearchSolid className="w-6 h-6 " />
      </span>
      <input
        className="px-10 form-input w-full bg-gray-200 placeholder-text-gray-600 rounded-full"
        type="text"
        placeholder={`Search ${contactsLength} contacts`}
        onChange={handleChange}
      />
    </div>
  );
};
