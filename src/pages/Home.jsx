import React from "react";
import { Sidebar } from "../components/Sidebar";
import { Chat } from "../components/Chat";

export const Home = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-slate-200">
      <div className="flex w-2/3 h-2/3 rounded-xl border shadow-xl overflow-hidden">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};
