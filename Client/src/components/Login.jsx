import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const URL = "http://localhost:8000/login";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(URL, {
        email,
        password,
      });

      setEmail("");
      setPassword("");

      navigate("/home");
    } catch (error) {
      // Check if the error response is 400 (bad request) for incorrect credentials
      if (error.response && error.response.status === 400) {
        alert("Email or Password is incorrect");
        setEmail("");
        setPassword(""); // Show alert box with the error message
      }
      console.log("Error occurred while logging in", error);
    }
  };

  return (
    <div className="h-full w-full mt-28 flex justify-center items-center">
      {/* Wrap the form with a border */}
      <div className="border border-gray-400 rounded-xl p-8 w-96">
        <h1 className="text-center mt-8 text-3xl font-bold">Welcome Back!</h1>
        <p className="text-center text-xl font-medium mt-3">
          Hope you are feeling better today.
        </p>

        <form onSubmit={handleSubmit} className="mt-14">
          <div className="flex flex-col items-center">
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
            </div>
            <div className="flex flex-col items-center mt-5 w-full">
              <button
                type="submit"
                className="text-lg bg-black text-white px-4 py-2 border border-black rounded-md hover:bg-blue-500 hover:text-black"
              >
                Sign In
              </button>
              <p className="text-sm mt-4 font-medium">
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-500">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
