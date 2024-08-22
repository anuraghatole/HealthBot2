import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const URL = "http://localhost:8000/register";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(URL, {
        name,
        email,
        password,
      });
      alert("Registration Successful!!");

      setName("");
      setEmail("");
      setPassword("");

      navigate("/login");
    } catch (error) {
      console.log("error occurred while registering user", error);
    }
  };

  return (
    <div className="h-full w-full mt-28 flex justify-center items-center">
      {/* Wrap the form with a border */}
      <div className="border border-gray-400 rounded-xl p-8 w-96">
        <h1 className="text-center mt-5 text-3xl font-bold">Register!</h1>
        <p className="text-center text-lg font-medium mt-3">
          Start your journey to get full access.
        </p>
        <form onSubmit={handleSubmit} className="mt-10">
          <div className="flex flex-col items-center">
            <div className="w-full mb-4">
              <label className="font-medium text-lg mb-2">Username:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-zinc-500 py-2 rounded-sm w-full text-lg font-normal pl-3 text-black"
              />
            </div>
            <div className="w-full mb-4">
              <label className="font-medium text-lg mb-2">Email:</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-zinc-500 py-2 rounded-sm w-full text-lg font-normal pl-3 text-black"
              />
            </div>
            <div className="w-full mb-4">
              <label className="font-medium text-lg mb-2">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-zinc-500 py-2 rounded-sm w-full text-lg font-normal pl-3 text-black"
              />
              <div className="flex justify-center mt-5">
                <button
                  type="submit"
                  className="text-lg bg-black text-white px-4 py-2 border border-black rounded-md hover:bg-blue-500 hover:text-black"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
