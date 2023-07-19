import React, { useContext, useRef, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext';

// Single message element, chat window will contain a list of these iimported into Messages.jsx

const Message = ({message}) => {
  console.log(message);

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  // UseRef is totarget the div for updating message list. 
  const ref = useRef();

  // useEffect is to make main chat window scroll down to the latest message for the user
  useEffect(() => {
    ref.current?.scrollIntoView({behaviour:"smooth"})
  }, [message]);


  return (
    <div ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner" }`}>
      <div className="messageInfo">
        <img src={
          message.senderId === currentUser.uid 
            ? currentUser.photoURL 
            : data.user.photoURL} alt="" />
        <span>Just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.image && <img src={message.image} alt="" /> }
      </div>
    </div>
  )
}

export default Message