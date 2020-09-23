import React from "react";
import { useSelector } from "react-redux";
import { signOut } from "../../redux/actions/authActions";

export const Header = ({ dispatch }) => {
  const userInitials = useSelector((state) => state.firebase.profile.initials);
  return (
    <header className="py-3 px-8 flex justify-between items-center border-b border-thin-border">
      <div className="font-bold lg:text-lg xl:text-2xl">Contacts</div>
      <div>
        <div className="pl-4 pr-2 flex justify-between items-center space-x-6">
          <button
            className="text-blue-600 border-b border-transparent hover:border-blue-800 hover:text-blue-800 focus:outline-none"
            onClick={() => dispatch(signOut())}
          >
            Sign Out
          </button>
          <div className="w-10 h-10 flex justify-center items-center bg-blue-500 rounded-full text-white">
            <span className="text-xl font-bold uppercase">{userInitials}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
