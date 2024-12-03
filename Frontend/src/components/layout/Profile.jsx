import React from "react";

const Profile = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <p>
           {user?.name || "Guest User "}
        </p>
        <img
          src={
            user?.pic ||
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
          }
          alt="User"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
    
        <p>
           {user?.email || "guest@gmail.com"}
        </p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Profile;
