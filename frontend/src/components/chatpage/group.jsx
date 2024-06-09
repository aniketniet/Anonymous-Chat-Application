import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8081", {
  transports: ["websocket", "polling", "flashsocket"],
});

function Group({ groupName }) {
  console.log("group opened", groupName);

  const [group, setGroup] = useState(groupName);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(`User${Math.floor(Math.random() * 1000)}`);

  useEffect(() => {
    if (group) {
      const modal = document.getElementById("my_modal_5");
      if (modal) {
        modal.showModal();
      }

      socket.emit("joinGroup", group);
      console.log("joined group", group);

      socket.on("message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socket.emit("leaveGroup", group);
        socket.off();
      };
    }
  }, [group]);

  const sendMessage = () => {
    const data = { group, message, user };
    socket.emit("sendMessage", data);
    setMessage("");
  };

  return (
    <>
      <div>
        <dialog id="my_modal_5" className="modal">
          <div className="modal-box">
            <div className="flex flex-col max-w-sm">
              <div className="flex-grow overflow-y-auto max-h-96">
                {/* Chat messages */}
                <h2>{group} Chat Room</h2>
                <div className="flex flex-col mb-4 gap-4 py-4">
                  {messages.map((msg, index) => (
                    <div className="flex justify-start" key={index}>
                      <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-[80%]">
                        <strong className="text-gray-900 text-sm">
                          {msg.user}:
                        </strong>{" "}
                        {msg.message}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center items-center h-16">
                {/* Chat input */}
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full max-w-lg mr-4"
                />
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={sendMessage}
                >
                  Send
                </button>
              </div>
            </div>

            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => setGroup("")}
              >
                ✕
              </button>
            </form>
          </div>
        </dialog>
      </div>
    </>
  );
}

export default Group;
