import React from "react";
import { deleteContact } from "../../../redux/actions/setContactActions";

export const ConfirmationModal = ({
  message,
  name,
  setOpenModal,
  dispatch,
}) => {
  return (
    <div className="py-2 " onClick={(e) => e.stopPropagation()}>
      <div className="pb-4">
        <span className="font-bold text-red-500 text-lg">
          {message} <span className="text-lg text-gray-900">{name}</span>
          <span className="text-lg font-normal text-gray-900">?</span>
        </span>
      </div>
      <div className="pt-12 flex justify-end items-center space-x-1 w-full text-sm  ">
        <button
          className="px-6 py-2 uppercase tracking-wide bg-yellow-400 font-semibold hover:bg-opacity-75 focus:bg-yellow-500 hover:shadow-lg focus:outline-none"
          onClick={() => setOpenModal(false)}
        >
          Cancel
        </button>

        <button
          className="px-6 py-2 text-white uppercase tracking-wide rounded bg-red-600 hover:bg-red-500 focus:bg-red-700  hover:shadow-lg focus:outline-none"
          onClick={() => {
            setOpenModal(false);
            dispatch(deleteContact());
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
