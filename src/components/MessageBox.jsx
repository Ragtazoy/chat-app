import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "@/context/ChatContext";
import { Message } from "./Message";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";

export const MessageBox = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <div className="bg-slate-100 p-4 text-black h-full overflow-scroll">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};
