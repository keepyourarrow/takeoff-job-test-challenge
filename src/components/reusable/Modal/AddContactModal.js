import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import { createContact } from "../../../redux/actions/setContactActions";

export const AddContactModal = ({ setOpenModal }) => {
  const dispatch = useDispatch();
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = (contact) => {
    let newContact = {
      name: contact.name,
      description: contact.description,
      address: contact.address,
      phone: contact.phone,
      note: contact.note,
    };
    setOpenModal(false);
    dispatch(createContact(newContact));
  };
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div className="flex justify-center font-bold text-xl">Add Contact</div>

      <div className="mt-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* name */}
          <label className="mt-5 block w-full" htmlFor="name">
            <div className="font-medium text-sm">Name</div>
            <input
              className="mt-2 form-input w-full"
              type="text"
              id="name"
              name="name"
              ref={register({
                required: { value: true, message: "This field is required" },
                minLength: { value: 3, message: "Min characters - 3" },
                maxLength: { value: 25, message: "Max characters - 25" },
              })}
            />
            <span className="mt-2 text-red-600">{errors?.name?.message}</span>
          </label>

          {/* description */}
          <label className="mt-5 block w-full" htmlFor="description">
            <div className="font-medium text-sm">Description</div>
            <TextareaAutosize
              className="mt-2 form-textarea resize-none w-full"
              id="description"
              name="description"
              minRows="1"
              maxRows="6"
              ref={register({
                required: { value: true, message: "This field is required" },
                minLength: { value: 3, message: "Min characters - 3" },
                maxLength: { value: 60, message: "Max characters - 60" },
              })}
            />
            <span className="mt-2 text-red-600">
              {errors?.description?.message}
            </span>
          </label>

          {/* phone */}
          <label htmlFor="phone" className="mt-5 block w-full">
            <div className="font-medium text-sm">
              Phone
              <span className="text-gray-500 font-normal text-xs">
                (Optional)
              </span>
            </div>
            <input
              className="mt-2 form-input w-full"
              type="text"
              id="phone"
              name="phone"
              ref={register({
                maxLength: { value: 30, message: "Max characters - 30" },
              })}
            />
            <span className="mt-2 text-red-600">{errors?.phone?.message}</span>
          </label>

          {/* address */}
          <label htmlFor="address" className="mt-5 block w-full">
            <div className="font-medium text-sm">
              Address
              <span className="text-gray-500 font-normal text-xs">
                (Optional)
              </span>
            </div>
            <TextareaAutosize
              className="mt-2 form-textarea w-full resize-none"
              id="address"
              name="address"
              minRows="1"
              maxRows="6"
              ref={register({
                maxLength: { value: 60, message: "Max characters - 60" },
              })}
            />

            <span className="mt-2 text-red-600">
              {errors?.address?.message}
            </span>
          </label>

          {/* private note */}
          <label htmlFor="note" className="mt-5 block w-full">
            <div className="font-medium text-sm">
              Private note
              <span className="text-gray-500 font-normal text-xs">
                (Optional)
              </span>
            </div>
            <TextareaAutosize
              className="mt-2 form-textarea w-full resize-none"
              id="note"
              name="note"
              minRows="1"
              maxRows="6"
              ref={register({
                maxLength: { value: 150, message: "Max characters - 150" },
              })}
            />
            <div className="-mt-1 text-xs text-gray-500">
              I.E: "very cool guy!"{" "}
            </div>
            <span className="mt-2 text-red-600">{errors?.note?.message}</span>
          </label>

          <button className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};
