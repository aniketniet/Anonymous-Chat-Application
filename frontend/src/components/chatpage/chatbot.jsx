import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ChatBot = () => {
  const [search, setSearch] = useState("");
  const [aiResponse, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  {
    /* alternate api - AIzaSyDfEOCBKoZBNrIElaUV4tWyDFw1k1NDSsU */
  }
  const genAI = new GoogleGenerativeAI(
    "AIzaSyDUawmjMXR0zEkMnOYtGz4KqZQekydVFzg"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const aiRun = async () => {
    setLoading(true);
    const prompt = `Answer this Question ${search} `;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setResponse(text);
    setLoading(false);
  };

  const handleClick = () => {
    aiRun();
  };

  return (
    <div>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box bg-white  rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h1 className="text-2xl">Chat with Generative AI!</h1>
          <p>Fell free to ask anything </p>
          <div
            id="search-bar"
            className="w-120 bg-white rounded-md shadow-lg z-10 mb-4 mt-6"
          >
            <div className="flex items-center justify-center p-2">
              <input
                onChange={(e) => handleChangeSearch(e)}
                type="text"
                placeholder="Search here"
                className="w-full rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
              />
              <button
                onClick={handleClick}
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md px-4 py-1 ml-2  focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
              >
                Search
              </button>
            </div>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <p className="font-black-100">
              <b>AI Response:</b> {aiResponse}
            </p>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default ChatBot;
