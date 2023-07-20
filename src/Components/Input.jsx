import React, { useContext, useState } from 'react'
import Attach from "../Images/attach.png";
import Img from "../Images/img.png";
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

// Component where messages are written between users located in the bottom of the chat window

const Input = () => {
  // 2 useStates, one for sending text messages and another for sending images
  const [ text, setText ] = useState("");
  const [ image, setImage ] = useState(null); 

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const handleSend = async ()=> {
    // Check if there is a file or not, if not send only texts
    // Update arrays using firebase method arrayUnion as per docs
    if(image){
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on('state_changed', (snapshot) => {}, 
        (error) => {
          // Error handling for unsuccessful image uploads
          // setErr(true);
        }, 
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(), 
                text,
                senderId:currentUser.uid,
                date:Timestamp.now(),
                image:downloadURL
              }),
            });
          });
        }
      );

    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(), 
          text,
          senderId:currentUser.uid,
          // could not user serverTimestamp is arrayUnion so had to use Timestamp.now
          date:Timestamp.now(),
        }),
      });
    }

    // updates currentUser chat lists with last message and the most recent timestamp
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]:{
        text
      },
      [data.chatId+".date"]: serverTimestamp(),
    });

    // Updates the other user's lists with last message and recent timestamp
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]:{
        text
      },
      [data.chatId+".date"]: serverTimestamp(),
    });

    // clears text from input field and attached image
    setText("");
    setImage(null);
  };

  return (
    <div className="input">
      <input 
        type="text" 
        placeholder="Type something..." 
        onChange={(e)=>setText(e.target.value)} 
        value={text}
      />
      <div className="send">
        {/* Attaching files and documents is currently non-functional, hiding icon until working code can be added */}
        {/* <img src={Attach} alt="" /> */}
        <input type="file" style={{display:"none"}} id="file" onChange={(e)=>setImage(e.target.files[0])} />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Input