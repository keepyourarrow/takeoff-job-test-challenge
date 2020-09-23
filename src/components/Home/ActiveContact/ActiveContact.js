import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ActiveContactBody } from "./ActiveContactBody";
import { ActiveContactHeader } from "./ActiveContactHeader";
import { LoadingGifSVG } from "../../../assets/LoadingGif";

export const ActiveContact = ({ dispatch }) => {
  const activeContact = useSelector(
    (state) => state.activeContact.activeContact
  );
  const [loading, setLoading] = useState(false);

  //whenever someone clicks on contact it shows a small loading
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [activeContact]);

  if (!activeContact.name) {
    return <div></div>;
  }

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-full w-full">
          <span>
            <LoadingGifSVG className="text-gray-400 w-32 h-32" />
          </span>
        </div>
      ) : (
        <>
          <ActiveContactHeader
            photo={activeContact.photo}
            name={activeContact.name}
            description={activeContact.description}
            dispatch={dispatch}
          />
          <ActiveContactBody
            name={activeContact.name}
            phone={activeContact.phone}
            note={activeContact.note}
            address={activeContact.address}
            dispatch={dispatch}
          />
        </>
      )}
    </>
  );
};
