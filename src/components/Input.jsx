import React, { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { ChatContext } from "@/context/ChatContext";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { v4 as uuid } from "uuid";
import { PaperClipIcon, PhotoIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";

export const Input = () => {
  const [text, setText] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now()
      })
    });

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: { text },
      [data.chatId + ".date"]: serverTimestamp()
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: { text },
      [data.chatId + ".date"]: serverTimestamp()
    });

    setText("");
  };

  return (
    <div className="bg-white text-gray-800 p-2 flex justify-between items-center">
      <input type="tex" placeholder="Type something..." value={text} onChange={(e) => setText(e.target.value)} className="w-full focus:outline-none" />
      <div className="flex space-x-2 p-2">
        <button>
          <PaperClipIcon className="w-8 h-auto" />
        </button>
        <button>
          <PhotoIcon className="w-8 h-auto" />
        </button>
        <button onClick={handleSend} className="bg-cyan-500 text-white px-2 py-1 flex items-center rounded-lg">
          <span>Send</span>
          <PaperAirplaneIcon className="w-6 h-auto ml-1" />
        </button>
      </div>
    </div>
  );
};
