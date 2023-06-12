import React, { useContext } from "react";
import { ChatContext } from "@/context/ChatContext";
import { VideoCameraIcon, UserPlusIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { MessageBox } from "./MessageBox";
import { Input } from "./Input";

export const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="basis-2/3 flex flex-col">
      <div id="chatInfo" className="bg-cyan-900/80 p-4 flex justify-between items-center">
        <span>{data.user?.displayName}</span>
        <div className="flex space-x-2">
          <VideoCameraIcon className="w-8 h-auto text-white" />
          <UserPlusIcon className="w-8 h-auto text-white" />
          <EllipsisHorizontalIcon className="w-8 h-auto text-white" />
        </div>
      </div>
      <MessageBox />
      <Input />
    </div>
  );
};
