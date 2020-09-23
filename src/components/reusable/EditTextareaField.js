import { CheckOutline, PencilSolid } from "@graywolfai/react-heroicons";
import React, { useRef, useState } from "react";
import ReactTooltip from "react-tooltip";
import TextareaAutosize from "react-textarea-autosize";
import { AnimatePresence } from "framer-motion";
import { ModalContainer } from "./Modal/ModalContainer";
import { WarningModal } from "./Modal/WarningModal";
import { LoadingGifSVG } from "../../assets/LoadingGif";
import { useSelector } from "react-redux";
import { editContactField } from "../../redux/actions/setContactActions";

export const EditTextareaField = ({ content = "", type, dispatch }) => {
  const textInputRef = useRef(null);
  const [inputText, setInputText] = useState(content);
  const [editing, setEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const loading = useSelector((state) => state.notifications.loading);

  const handleKeyPress = (e) => {
    if ((e.key === "Enter" && e.shiftKey) || e.key === "Escape") {
      setInputText(content);
      setEditing(false);
    } else if (e.key === "Enter") {
      handleSubmit();
    }
  };
  const handleEdit = () => {
    setEditing(true);

    //show focus on the textarea
    setTimeout(() => {
      textInputRef.current.focus();
      textInputRef.current.setSelectionRange(
        textInputRef.current.value.length,
        textInputRef.current.value.length
      );
    }, 0);
  };
  const handleSubmit = (e) => {
    //   if text didnt change
    if (inputText === content) {
      setEditing(false);
      setInputText(content);
    }
    // if field is empty we show a warning
    else if (inputText.length === 0) {
      // we want to show warning only for description,because it can't be empty
      if (type === "description") {
        setOpenModal(true);
        setInputText(content);
        return;
      } else {
        setEditing(false);
        dispatch(editContactField(type, inputText));
      }
    } else {
      setEditing(false);
      dispatch(editContactField(type, inputText));
    }
  };
  return (
    <div
      className={
        "flex items-start pb-1 border-b-2 border-transparent " +
        (editing ? "border-blue-500 mb-2" : "")
      }
    >
      <div className="flex-auto overflow-hidden w-50">
        <TextareaAutosize
          className={
            "w-full border-none focus:outline-none resize-none leading-7 overflow-hidden " +
            (editing ? "text-gray-900 font-normal text-base" : "")
          }
          type="text"
          name={type}
          value={inputText}
          minRows="1"
          maxRows="6"
          ref={textInputRef}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={!inputText ? `Enter ${type}...` : ""}
          readOnly={!editing && true}
          maxLength={type === "note" ? 150 : 60}
        />
      </div>

      {loading ? (
        <LoadingGifSVG className="w-8 h-8" />
      ) : (
        <div>
          {!editing ? (
            <button
              type="button"
              className="h-6 w-6 text-gray-900 text-opacity-50 focus:outline-none"
              data-tip=""
              data-for={`edit-${type}`}
              onClick={handleEdit}
            >
              <PencilSolid />
              <ReactTooltip
                id={`edit-${type}`}
                place="bottom"
                effect="solid"
                delayShow={1000}
                globalEventOff="click"
              >
                Edit
              </ReactTooltip>
            </button>
          ) : (
            // IF WE ARE EDITING
            <div className="flex items-center space-x-1 text-gray-900 text-opacity-50">
              <button
                type="submit"
                data-tip=""
                data-for={`checkmark-${type}`}
                className="h-6 w-6  focus:outline-none"
                onClick={handleSubmit}
              >
                <ReactTooltip
                  className="whitespace-no-wrap"
                  id={`checkmark-${type}`}
                  place="bottom"
                  effect="solid"
                  delayShow={1000}
                  globalEventOff="click"
                >
                  Click to Save, Esc to cancel.
                </ReactTooltip>
                <CheckOutline />
              </button>
            </div>
          )}
        </div>
      )}
      {/* Warning modal if text is empty */}
      <AnimatePresence>
        {openModal && (
          <ModalContainer maxWidth="max-w-lg">
            <WarningModal
              message="can't be empty"
              type={type}
              dispatch={dispatch}
              setOpenModal={setOpenModal}
            />
          </ModalContainer>
        )}
      </AnimatePresence>
    </div>
  );
};
