import React, { useState } from "react";
import Chating from "./components/chatpage/chating";

import ChatBot from "./components/chatpage/chatbot";
import Head from "./components/chatpage/head";
import Group from "./components/chatpage/group";
import Password from "./components/password";

function ChatPage() {
  const [groupName, setGroupName] = useState("");

  return (
    <div>
      <Chating />
      <ChatBot />
      <Head />
      <Password />
      {groupName && <Group groupName={groupName} />}
      <>
        <div className="container relative flex flex-col justify-between h-full max-w-6xl px-10 mx-auto xl:px-0 mt-5">
          <div className="w-full">
            <div className="flex flex-col w-full mb-10 sm:flex-row">
              <div className="w-full mb-10 sm:mb-0 sm:w-1/2 text-center">
                <div className="relative h-full ml-0 mr-0 sm:mr-10">
                  <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-500 rounded-lg" />
                  <div className="relative h-full p-5 bg-white border-2 border-indigo-500 rounded-lg  ">
                    <div className="flex items-center -mt-1">
                      <h2 className="my-2 ml-3 text-2xl font-bold text-gray-800">
                        Chat Anonymously
                      </h2>
                    </div>

                    <p className="mb-2 text-gray-600">
                      Now you can chat with anyone without revealing your
                      identity and feel free to share your thoughts.
                    </p>
                    <button
                      className="btn btn-outline btn-warning btn-wide"
                      onClick={() =>
                        document.getElementById("my_modal_3").showModal()
                      }
                    >
                      Start Chat
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-1/2 text-center">
                <div className="relative h-full ml-0 md:mr-10">
                  <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-purple-500 rounded-lg" />
                  <div className="relative h-full p-5 bg-white border-2 border-purple-500 rounded-lg">
                    <div className="flex items-center -mt-1">
                      <h3 className="my-2 ml-3 text-2xl font-bold text-gray-800">
                        Chat with Generative AI
                      </h3>
                    </div>
                    <p className="mb-2 text-gray-600 ">
                      Now you can chat with AI and get instant responses with
                      best accuracy.
                    </p>
                    <button
                      className="btn btn-outline btn-info btn-wide"
                      onClick={() =>
                        document.getElementById("my_modal_4").showModal()
                      }
                    >
                      Start Chat
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container relative flex flex-col justify-between h-full max-w-6xl px-10 mx-auto xl:px-0 mt-5">
          <div className="w-full">
            <div className="flex flex-col w-full mb-10 sm:flex-row">
              <div className="w-full mb-10 sm:mb-0 sm:w-1/2 text-center">
                <div className="relative h-full ml-0 mr-0 sm:mr-10">
                  <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-green-500 rounded-lg" />
                  <div className="relative h-full p-5 bg-white border-2 border-green-500 rounded-lg  ">
                    <div className="flex items-center -mt-1">
                      <h2 className="my-2 ml-3 text-2xl font-bold text-gray-800">
                        Public Groups
                      </h2>
                    </div>

                    <p className="mb-2 text-gray-600">
                      Chat in public groups and share your thoughts about topics
                      you like and connect with like-minded peoples.
                    </p>
                    <div className="flex flex-wrap justify-center">
                      <button
                        className="btn btn-outline btn-success m-2 "
                        onClick={() => setGroupName("Technology")}
                      >
                        Technology
                      </button>
                      <button className="btn btn-outline btn-defaul m-2">
                        Social
                      </button>
                      <button className="btn btn-outline btn-secondary m-2 ">
                        Business
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-1/2 text-center">
                <div className="relative h-full ml-0 md:mr-10">
                  <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-red-600 rounded-lg" />
                  <div className="relative h-full p-5 bg-white border-2 border-red-500 rounded-lg">
                    <div className="flex items-center -mt-1">
                      <h3 className="my-2 ml-3 text-2xl font-bold text-gray-800">
                        Profile
                      </h3>
                    </div>
                    <p className="mb-2 text-gray-600 ">
                      Update your profile, change your name and password.
                    </p>
                    <button
                      className="btn btn-outline btn-error btn-wide mt-6"
                      onClick={() =>
                        document.getElementById("my_modal_6").showModal()
                      }
                    >
                      Update Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>

      <div>
        <div className="flex flex-col min-h-screen">
          <main className="flex-1"> {/* Add any content here */}</main>
          <footer className="bg-gray-900 text-white py-4">
            <div className="container mx-auto px-4">
              <p className="text-center">
                Flowchat &copy; 2024. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
