import React from "react";

export const WarningModal = ({ message, type, setOpenModal }) => {
  return (
    <div className="py-2 " onClick={(e) => e.stopPropagation()}>
      <div className="pb-4">
        <div>
          <span className="text-gray-900 font-bold text-lg">{type + " "}</span>
          <span className="text-black font-normal text-base">{message}!</span>
        </div>
      </div>
      <div className="pt-12 flex justify-end items-center space-x-1 w-full text-sm  ">
        <button
          className="px-6 py-2 uppercase tracking-wide text-white bg-green-500 font-semibold hover:bg-opacity-75 focus:bg-green-600 hover:shadow-lg focus:outline-none"
          onClick={() => setOpenModal(false)}
        >
          Ok
        </button>
      </div>
    </div>
  );
};
