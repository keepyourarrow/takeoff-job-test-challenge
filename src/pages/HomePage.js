import { AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { ActiveContact } from "../components/Home/ActiveContact/ActiveContact";
import { ContactList } from "../components/Home/Contacts/ContactList";
import { ContactsHeader } from "../components/Home/Contacts/ContactsHeader/ContactsHeader";
import { Header } from "../components/Home/Header";

const HomePage = () => {
  useFirestoreConnect({
    collection: "contacts",
    orderBy: ["createdAt", "desc"],
  });
  const dispatch = useDispatch();
  //getting contacts from firebase
  const contacts = useSelector((state) => state.firestore.ordered.contacts);
  // filteredContacts is the same as contacts, but we need to separate the two in order to search through them without using a database
  const filteredContacts = useSelector(
    (state) => state.contacts.filteredContacts
  );

  /*
  to populate our redux state called filteredContacts
  it will be called on the first render or whenever database changes.
  i.e: contact deleted,changed etc...
  */
  useEffect(() => {
    if (contacts) {
      setTimeout(() => {
        dispatch({ type: "SET_FILTERED_CONTACTS", payload: contacts });
      }, 500);
    }
  }, [contacts]);
  return (
    <>
      <div className="xl:py-5 h-screen lg:block xl:container mx-auto w-full">
        <div className="h-full bg-white shadow-contacts-container overflow-hidden">
          <Header dispatch={dispatch} />
          <div className="pb-16 flex items-center w-full h-full overflow-hidden">
            <div className="pt-4 relative  h-full max-w-md border-r border-gray-300 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 ">
              <ContactsHeader contacts={filteredContacts} dispatch={dispatch} />
              <ContactList contacts={filteredContacts} dispatch={dispatch} />
            </div>
            <div className="flex-1 h-full">
              <ActiveContact dispatch={dispatch} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
