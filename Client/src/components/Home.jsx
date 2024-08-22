import React from "react";

const Home = () => {
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
      <div className=" flex justify-center items-center h-96">
        <h3 className=" font-semibold text-4xl">
          Hey, How can I help you Today?
        </h3>{" "}
      </div>
      <div>
        <div>
          <div className="absolute bottom-2 w-screen p-7  flex justify-center">
            <input
              type="text"
              placeholder="Search ChatBOT"
              className="w-[800px] rounded-3xl p-3  border bg-[#2f2f2f] text-zinc-100 pl-5 text-xl font-normal "
            />
          </div>
          <div class="animate-bounce bg-blue-500 text-white p-4 rounded">
            Bouncing Box
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
