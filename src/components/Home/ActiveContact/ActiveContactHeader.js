import React from "react";
import { EditInputField } from "../../reusable/EditInputField";
import { EditTextareaField } from "../../reusable/EditTextareaField";

export const ActiveContactHeader = ({ photo, name, description, dispatch }) => {
  return (
    <div className="py-4 border-b border-gray-300">
      <div className="mx-auto max-w-xs">
        <div className="flex justify-center">
          <img
            className="w-24 h-24 object-cover object-center rounded-full"
            src={photo}
            alt="contact-avatar"
          />
        </div>
        <div className="mt-2 font-bold text-2xl">
          <EditInputField content={name} type="name" dispatch={dispatch} />
        </div>
        <div className="mt-2 text-gray-500 font-bold">
          <EditTextareaField
            content={description}
            type="description"
            dispatch={dispatch}
          />
        </div>
      </div>
    </div>
  );
};
