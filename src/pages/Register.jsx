import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    console.log(displayName);

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Update profile
      await updateProfile(res.user, {
        displayName
      });

      //Insert Users
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email
      });

      //Insert userChats
      await setDoc(doc(db, "userChats", res.user.uid), {});
      navigate("/");
    } catch (err) {
      setErr(true);
      console.log(err);
    }
  };

  return (
    <div className="bg-cyan-200 h-screen flex justify-center items-center">
      <div className="bg-white text-gray-700 w-96 p-10 flex flex-col items-center rounded-xl border shadow-lg">
        <h1 className="text-4xl font-medium">Chat App</h1>
        <h5 className="text-lg font-normal my-2">Register</h5>
        <form onSubmit={handleRegister} className="w-full flex flex-col text-center">
          <div className="mb-4 flex flex-col space-y-2">
            <input type="text" placeholder="Username" className="p-2 border-b-2 border-b-cyan-500 focus:outline-none" />
            <input type="text" placeholder="Email" className="p-2 border-b-2 border-b-cyan-500 focus:outline-none" />
            <input type="password" placeholder="Password" className="p-2 border-b-2 border-b-cyan-500 focus:outline-none" />
          </div>
          <button type="submit" className="bg-cyan-500 active:bg-cyan-400 text-white w-full mt-6 mb-2 p-2 rounded-lg">
            Register
          </button>
          {err && <span className="text-red-500">Something went wrong</span>}
        </form>
        <span>
          You already have an account?{" "}
          <Link className="hover:underline" to={"/login"}>
            Login
          </Link>
        </span>
      </div>
    </div>
  );
};
