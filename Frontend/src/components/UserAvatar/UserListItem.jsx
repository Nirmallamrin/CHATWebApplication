import React from 'react'
import { ChatState } from '../../Context/ChatProvider'

const UserListItem = ({ handleFunction }) => {
    
    const { user } = ChatState();
  return (
    <div onClick={handleFunction} className="flex cursor-pointer items-center">
        <div>
              <p>{user.name}</p> 
              <img src={user.pic} />
          </div>
          <div>
              <p>{user.name}</p>
              <p>Email: {user.email }</p>
          </div>
    </div>
  );
}

export default UserListItem