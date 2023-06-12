import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
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
        <h5 className="text-lg font-normal my-2">Login</h5>
        <form onSubmit={handleLogin} className="w-full flex flex-col text-center">
          <div className="mb-4 flex flex-col space-y-2">
            <input type="text" placeholder="Email" className="p-2 border-b-2 border-b-cyan-500 focus:outline-none" />
            <input type="password" placeholder="Password" className="p-2 border-b-2 border-b-cyan-500 focus:outline-none" />
          </div>
          <button type="submit" className="bg-cyan-500 active:bg-cyan-400 text-white w-full mt-6 mb-2 p-2 rounded-lg">
            Login
          </button>
          {err && <span className="text-red-500">Something went wrong</span>}
        </form>
        <span>
          You don't have an account? <Link className="hover:underline" to={"/register"}>Register</Link>
        </span>
      </div>
    </div>
  );
};
