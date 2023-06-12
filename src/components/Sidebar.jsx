import React from "react";
import { Navbar } from "./Navbar";
import { Search } from "./Search";
import { UserChats } from "./UserChats";

export const Sidebar = () => {
  return (
    <div className="basis-1/3 bg-cyan-900">
      <Navbar />
      <Search />
      <UserChats />
    </div>
  );
};
