import React from 'react'
import { ChatState } from '../Context/ChatProvider';
import MyChats from '../components/MyChats';
import ChatBox from '../components/ChatBox';
import SideDrawer from '../components/layout/SideDrawer';


const ChatPage = () => {

  const { user } = ChatState()
  
  return (
    <div className="w-full">
      {user && <SideDrawer/>}
      <div className='flex justify-between w-full h-96 p-10'>
        {user && <MyChats/>}
        {user && <ChatBox/>}
      </div>
    </div>
  );
}

export default ChatPage