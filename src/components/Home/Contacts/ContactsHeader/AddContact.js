import { PlusOutline, PlusSolid } from "@graywolfai/react-heroicons";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { useState } from "react";
import { AddContactModal } from "../../../reusable/Modal/AddContactModal";
import { ModalContainer } from "../../../reusable/Modal/ModalContainer";

export const AddContact = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <button
        type="button"
        className="focus:outline-none"
        onClick={() => setOpenModal(true)}
      >
        <span className="text-blue-600 hover:text-blue-400">
          <PlusOutline className="w-8 h-8" />
        </span>
      </button>

      <AnimatePresence>
        {openModal && (
          <ModalContainer
            maxWidth="max-w-xl"
            exitButton={true}
            setOpenModal={setOpenModal}
          >
            <AddContactModal setOpenModal={setOpenModal} />
          </ModalContainer>
        )}
      </AnimatePresence>
    </>
  );
};
