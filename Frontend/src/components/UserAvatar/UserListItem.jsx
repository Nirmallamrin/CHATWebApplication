import React from 'react'
import { ChatState } from '../../Context/ChatProvider'

const UserListItem = ({user, handleFunction }) => {
    
   
  return (
    <div
      onClick={handleFunction}
      className="flex cursor-pointer items-center p-2 hover:bg-gray-100 rounded-md"
    >
      
        <img
          src={user.pic}
          alt={user.userName}
          className="w-12 h-12 rounded-full mr-4"
        />
      
      <div>
        <p className="font-bold">{user.userName}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
    </div>
  );
}

export default UserListItem