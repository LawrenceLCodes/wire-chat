import React, { useContext, useState, useEffect } from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);

  // This useEffect is used to listen for realtime updates to chats and change accordingly
  useEffect(()=> {
    const getChats = ()=> {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
  
      return () => {
        unsub();
      };
    }
    // To prevent from erroring out and displaying a blank screen, grabbing of chat data was wrapped inside getChats function and called here.
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  console.log(Object.entries(chats));

  // Updates the user
  const handleSelect = (u)=> {
    dispatch( {type:"CHANGE_USER", payload:u} )
  }

  return (
    <div className="chats">
      {/* To convert objects were user data is stored into newly created array using .map method */}
      {/* Using sort method to arrange chats for that the most recent ones are listed at the top, using a,b method to compare both using date */}
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat)=>(
        // data from .map created array is used here to fill in:
        // Unique key is required here
        <div className="userChat" key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
        {/* Photo from photoURL */}
        <img src={chat[1].userInfo.photoURL} alt="" />
        <div className="userChatInfo">
          {/* Display name */}
          <span>{chat[1].userInfo.displayName}</span>
          {/* Last message received from that user */}
          <p>{chat[1].lastMessage?.text}</p>
        </div>
      </div>
      ))}
    </div>
  )
}

export default Chats