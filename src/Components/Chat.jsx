import React, { useContext } from 'react'
import Cam from "../Images/cam.png";
import Add from "../Images/add.png";
import More from "../Images/more.png";
import Messages from "..//Components/Messages";
import Input from "../Components/Input";
import { ChatContext } from "../Context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);
  console.log(data);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat