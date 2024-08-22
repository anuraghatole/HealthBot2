import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ textbox: query }),
      });

      if (response.ok) {
        const data = await response.json();
        navigate("/result", { state: { recommendations: data.recommendations } });
      } else {
        console.error("Failed to fetch recommendations");
        // Handle errors appropriately here
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <div className="pl-7 pt-5 font-semibold text-[#b4b4b4] text-xl border-b pb-4">
        <div className="flex items-center justify-between">
          <h1>ChatBOT</h1>
          <img
            src="https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
            className="w-8 object-cover rounded-full mr-6"
            alt="ChatBOT Logo"
          />
        </div>
      </div>
      <div className="flex justify-center items-center h-96">
        <h3 className="font-semibold text-4xl">
          Hey, How can I help you Today?
        </h3>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="absolute bottom-2 w-screen p-7 flex justify-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search ChatBOT"
              className="w-[800px] rounded-3xl p-3 border bg-[#2f2f2f] text-zinc-100 pl-5 text-xl font-normal"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Home;
