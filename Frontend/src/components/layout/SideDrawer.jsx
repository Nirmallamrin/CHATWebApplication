import React from 'react'
import { FaSearch } from "react-icons/fa";
import { useState } from 'react';
import { IoIosNotifications } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";
import { ChatState } from '../../Context/ChatProvider';
import { RxAvatar } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import Profile from './Profile';
import {  toast } from "react-toastify";
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';
import axios from "axios";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, setSelectedChat, chats, setChats } = ChatState();
  const navigate = useNavigate()
  
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen); // Toggle menu visibility
  };

  const handleLogout = () => {
    // Add logout functionality
    console.log("Logout clicked");
    localStorage.removeItem("userInfo");
    navigate("/")
  };

  const handleProfile = () => {
    // Add "My Profile" functionality
    console.log("My Profile clicked");
    setShowProfile(true);
  };
  
  const handleCloseProfile = () => {
    setShowProfile(false); // Hide the profile modal
  };
  
  const handleSearchClick = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };
  
  const handleSearch = async () => {
    if (!search) {
      alert("please Enter Something");
      return
    }
   
    try {
      setLoading(true)
      const { data } = await axios.get(`http://localhost:5000/user/users?search=${ search }`)
      setLoading(false);
      setSearchResult(data)
    } catch (error) {
      alert("Error Occured")
    }
  };
  
  const accessChat = async (userId) => {
    console.log("Access chat with user ID:", userId);

    try {
      setLoading(true);

      const { data } = await axios.post(
        "http://localhost:5000/chat/access", { userId });
      
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoading(false);
      console.log(data)
    } catch (error) {
      alert("Error in Fetching the chat")
    }

  }
  return (
    <div>
      <div className="bg-slate-500 flex justify-between items-center p-4">
        {/* Search User Button */}
        <button onClick={handleSearchClick} className="flex items-center gap-2">
          <FaSearch />
          <span>Search User</span>
        </button>

        {/* My Chat Title */}
        <div>
          <h1 className="text-xl font-bold">My Chat</h1>
        </div>

        {/* Notifications and User Section */}
        <div className="relative flex items-center gap-4">
          {/* Notifications */}
          <div className="cursor-pointer text-2xl">
            <IoIosNotifications />
          </div>

          {/* User Menu */}
          <div>
            <button
              onClick={handleMenuToggle}
              className="flex items-center gap-2"
            >
              <CiMenuBurger />
              {user?.name ? (
                <RxAvatar name={user.name} />
              ) : (
                <span className="text-sm">Guest</span>
              )}
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg z-10">
                <button
                  onClick={handleProfile}
                  className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                >
                  My Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
        {showProfile && <Profile user={user} onClose={handleCloseProfile} />}
      </div>
      {drawerOpen && (
        <div className="fixed inset-0 z-30">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={handleCloseDrawer}
          ></div>
          {/* Drawer */}
          <div className="fixed top-0 left-0 h-full w-64 bg-white p-4 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Search Chats</h2>

            {/* Search Bar */}
            <div className="flex flex-col space-y-2">
              <div className="flex space-x-2">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search users"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <button
                  onClick={handleSearch}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Go
                </button>
              </div>

              {/* Search Results */}
              <div className="mt-4 space-y-2">
                {loading ? (
                  <div className="flex justify-center items-center">
                    <div
                      className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"
                      role="status"
                    ></div>
                  </div>
                ) : searchResult.length > 0 ? (
                  searchResult.map((user) => (
                    <div
                      key={user._id}
                      onClick={() => {
                        accessChat(user._id);
                        handleCloseDrawer(); // Close the drawer after selecting a chat
                      }}
                      className="flex items-center p-3 border rounded shadow-md hover:bg-gray-100 cursor-pointer"
                    >
                      <img
                        src={user.pic || "https://via.placeholder.com/40"}
                        alt={user.name}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No users found</p>
                )}
              </div>
            </div>

            <button
              onClick={handleCloseDrawer}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SideDrawer