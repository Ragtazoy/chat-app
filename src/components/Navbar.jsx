import React, { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="bg-cyan-950 p-4 flex items-center justify-between">
      <div className="hidden lg:contents">Chat App</div>
      <div className="flex items-center">
        <UserCircleIcon className="w-8 h-auto text-white" />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)} className="ml-2 p-1 bg-cyan-800 active:bg-cyan-700">
          Logout
        </button>
      </div>
    </div>
  );
};
