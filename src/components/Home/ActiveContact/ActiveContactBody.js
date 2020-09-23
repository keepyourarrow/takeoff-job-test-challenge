import {
  DocumentTextOutline,
  LocationMarkerOutline,
  PhoneOutline,
} from "@graywolfai/react-heroicons";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { useState } from "react";
import { EditInputField } from "../../reusable/EditInputField";
import { EditTextareaField } from "../../reusable/EditTextareaField";
import { ConfirmationModal } from "../../reusable/Modal/ConfirmationModal";
import { ModalContainer } from "../../reusable/Modal/ModalContainer";

export const ActiveContactBody = ({ name, phone, address, note, dispatch }) => {
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  return (
    <div className="px-8 py-12">
      <div className="flex justify-around">
        {/* phone */}
        <div className="flex-1">
          <div className="flex items-center space-x-4">
            <span>
              <PhoneOutline className="text-blue-600 w-7 h-7" />
            </span>
            <div className="font-medium text-lg">
              <EditInputField
                content={phone}
                type="phone"
                dispatch={dispatch}
              />
              <div className="-mt-1 text-gray-600 text-opacity-75 text-xs font-normal uppercase tracking-wide leading-3">
                Work
              </div>
            </div>
          </div>
          {/* address */}
          <div className="mt-10 flex items-start space-x-4">
            <span>
              <LocationMarkerOutline className="text-blue-600 w-7 h-7" />
            </span>
            <div className="font-semibold text-lg">
              <EditTextareaField
                content={address}
                type="address"
                dispatch={dispatch}
              />
              <div className="-mt-1 text-gray-600 text-opacity-75 text-xs font-normal uppercase tracking-wide leading-3">
                Work
              </div>
            </div>
          </div>
        </div>

        {/* note */}
        <div className="flex-1">
          <div className="flex space-x-4">
            <span>
              <DocumentTextOutline className="text-blue-600 w-7 h-7" />
            </span>
            <span className="text-lg text-gray-700 font-medium">
              Private note
            </span>
          </div>
          <div className="mt-4 py-5 px-5 border border-thin-border rounded-md">
            <EditTextareaField content={note} type="note" dispatch={dispatch} />
          </div>
        </div>
      </div>

      {/* delete button */}
      <div className="-ml-6 mt-10 flex justify-center w-full">
        <button
          className="px-6 py-2 text-white bg-red-500 hover:bg-red-400 focus:bg-red-600 rounded-md shadow focus:outline-none"
          onClick={() => setOpenConfirmationModal(true)}
        >
          Delete
        </button>
      </div>

      {/* Confirmation modal */}
      <AnimatePresence>
        {openConfirmationModal && (
          <ModalContainer maxWidth="max-w-lg">
            <ConfirmationModal
              message="Are you sure you want to delete"
              name={name}
              dispatch={dispatch}
              setOpenModal={setOpenConfirmationModal}
            />
          </ModalContainer>
        )}
      </AnimatePresence>
    </div>
  );
};
