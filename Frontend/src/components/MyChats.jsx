import React, { useEffect } from "react";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import { useState } from "react";
import ChatLoading from "./ChatLoading";
import getSender from "../config/ChatLogic";

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const fetchChats = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/chat/fetch");
      setChats(data);
      console.log(data);
    } catch (error) {
      alert("Error Ocurred");
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, []);
  return (
    <div className="bg-white flex-col items-center ">
      <div className="flex justify-between items-center">
        My chats
        <button className="flex">New Group Chat</button>
      </div>
      <div className="flex flex-col bg-white overflow-hidden w-full h-full p-3">
        {chats ? (
          <div className="overflow-scroll">
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
