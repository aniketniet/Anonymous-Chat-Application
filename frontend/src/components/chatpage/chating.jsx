// client/src/App.js
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";

const Chating = () => {
  const [socket, setSocket] = useState(null);
  const [chatConnected, setChatConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const handleStartChat = () => {
    socket.emit("start_chat");
    console.log("start chat");
  };

  const handleSendMessage = () => {
    const messageObject = { text: message, sender: "user" };
    socket.emit("send_message", messageObject);
    setMessages((prevMessages) => [...prevMessages, messageObject]);
    setMessage("");
  };

  const handleLeaveChat = () => {
    socket.emit("leave_chat");
    setChatConnected(false);
    setMessages([]);
  };

  useEffect(() => {
    const socket = io("http://localhost:8081", {
      transports: ["websocket", "polling", "flashsocket"],
    });
    setSocket(socket);

    if (socket) {
      socket.on("chat_connected", () => {
        setChatConnected(true);
      });

      socket.on("receive_message", (message) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: message.text, sender: "server" },
        ]);
      });

      socket.on("chat_disconnected", () => {
        setChatConnected(false);
        setMessages([]);
      });
    }

    return () => {
      socket.off("chat_connected");
      socket.off("receive_message");
      socket.off("chat_disconnected");
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          {chatConnected ? (
            <div className="flex flex-col max-w-sm">
              <div className="flex-grow overflow-y-auto max-h-96">
                {/* Chat messages */}
                <div className="flex flex-col mb-4 gap-4 py-4">
                  <ScrollToBottom>
                    {messages.map((message, index) => (
                      <div
                        className={`flex ${
                          message.sender === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                        key={index}
                      >
                        <div
                          className={`${
                            message.sender === "user"
                              ? "bg-blue-500 text-white"
                              : "bg-gray-100 text-gray-900"
                          } rounded-lg px-4 py-2 max-w-[80%]`}
                        >
                          <p className="text-sm">{message.text}</p>
                        </div>
                      </div>
                    ))}
                  </ScrollToBottom>
                </div>
              </div>

              <div className="flex justify-center items-center h-16">
                {/* Chat input */}
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full max-w-lg mr-4"
                  placeholder="Type a message..."
                />
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleSendMessage}
                >
                  Send
                </button>
              </div>
            </div>
          ) : (
            <button onClick={handleStartChat}>Start Chat Now</button>
          )}
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={handleLeaveChat}
            >
              ✕
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Chating;
