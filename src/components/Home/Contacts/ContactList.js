import { motion } from "framer-motion";
import React from "react";

export const ContactList = ({ contacts, dispatch }) => {
  const handleActiveContact = (contact) => {
    dispatch({ type: "SELECT_ACTIVE_CONTACT", payload: contact });

    /*
    adds active: true to the selected contact
    i.e filteredContacts has 10 objects, all actives are set to false
    after this dispatch only 1 contact's active will be set to true
    this is just to visually show that contact was selected.
    */
    dispatch({ type: "SET_SELECTED_ACTIVE", payload: contact });
  };
  return (
    <section>
      {contacts.map((contact) => {
        return (
          <div
            role="button"
            className={
              "pl-6 pr-2 mb-4 flex space-x-5 cursor-pointer hover:bg-gray-200 xl:pr-12 " +
              (contact.active && "bg-gray-200")
            }
            key={contact.id}
            onClick={() => handleActiveContact(contact)}
          >
            <div>
              <img
                className={
                  "w-16 h-16 object-cover object-center rounded-full " +
                  (contact.active && "shadow-image-outline")
                }
                src={contact.photo}
                alt=""
              />
            </div>
            <div className="max-w-sm">
              <span className="font-bold text-lg truncate">{contact.name}</span>
              <div className="text-gray-500 truncate leading-5">
                {contact.description}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};
