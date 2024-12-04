import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import getSender from "../config/ChatLogic";

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, chats, setChats } = ChatState();

  // Fetch chats from the backend
  const fetchChats = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/chat");
      if (data) {
        setChats(data); // Set chats in context
      }
    } catch (error) {
      alert("Error occurred while fetching chats");
    }
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setLoggedUser(userInfo); // Set logged-in user from localStorage
    }
  }, []);
  
  useEffect(() => {
    if (loggedUser) {
      fetchChats(); // Fetch chats after loggedUser is set
    }
  }, [loggedUser]);

  return (
    <div className="flex flex-col w-80 h-screen border-r bg-white shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-bold">My Chats</h2>
        <button className="px-4 py-2 bg-teal-500 text-white rounded">
          New Group Chat
        </button>
      </div>

      {/* Chat List */}
      <div className="flex flex-col bg-white overflow-hidden w-full h-full p-3">
        {chats ? (
          <div >
            {chats.map((chat) => {
              <div
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                className={`cursor-pointer px-3 py-2 
                    ${
                      selectedChat === chat
                        ? "bg-teal-500 text-white"
                        : "bg-gray-100 text-black"
                    }`}
              >
                {console.log(selectedChat)}
                <p>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </p>
              </div>;
            })}
          </div>
        ) : (
          <ChatLoading />
        )}
      </div>
    </div>
  );
};

export default MyChats;
