import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "@/context/AuthContext";
import { ChatContext } from "@/context/ChatContext";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  if (message.senderId === currentUser.uid) {
    return (
      <div ref={ref} className="flex flex-row-reverse mb-4">
        <div id="messageInfo" className="text-gray-500 font-light flex flex-col">
          <UserCircleIcon className="w-10 h-auto" />
          <span className="">just now</span>
        </div>
        <div id="messageContent" className="bg-cyan-500 text-white mx-2 p-4 flex flex-col rounded-l-2xl rounded-b-2xl">
          <p className="max-w-2xl break-words">{message.text}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div ref={ref} className="flex mb-4">
        <div id="messageInfo" className="text-gray-500 font-light flex flex-col">
          <UserCircleIcon className="w-10 h-auto" />
          <span className="">just now</span>
        </div>
        <div id="messageContent" className="bg-white mx-2 p-4 flex flex-col rounded-r-2xl rounded-b-2xl">
          <p className="max-w-2xl break-words">{message.text}</p>
        </div>
      </div>
    );
  }
};
