import React, { useContext, useState } from "react";
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "@/firebase";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { AuthContext } from "@/context/AuthContext";

export const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    setUser(null);
    const q = query(collection(db, "users"), where("displayName", "==", username));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
      console.log(err);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check chat exists, if not create
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        console.log(combinedId);
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        console.log("pass setDoc");

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName
          },
          [combinedId + ".data"]: serverTimestamp()
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName
          },
          [combinedId + ".data"]: serverTimestamp()
        });
      }
    } catch (err) {
      console.log(err);
    }

    setUser(null);
    setUsername("");
  };

  return (
    <div className="text-center">
      <div id="searchBar">
        <input
          type="text"
          placeholder="find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className="bg-cyan-900 py-1 px-2 w-full border-b focus:outline-none"
        />
      </div>
      <div id="searchResult" className="flex flex-col">
        {err && <span className="my-2">User not found</span>}
        {user && (
          <div onClick={handleSelect} className="flex items-center p-1 border-b hover:cursor-pointer hover:bg-cyan-950 active:bg-cyan-800">
            <UserCircleIcon className="w-16 h-auto text-white" />
            <div>
              <span>{user.displayName}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
