import React, { useState, useContext } from 'react';
// Firebase methods used on this component, check firebase docs for a refresher
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from '../Context/AuthContext';

const Search = () => {
  // Used to grab and store username, user and if no user is found via search bar
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  // Takes the current user using AuthContext which is needed to check for the existence of chat groups with other users in handleSelect below
  const {currentUser} = useContext(AuthContext);

  // function for search
  const handleSearch = async ()=> {
    // Search database and collections using firebase query

    // query for checking users with the "users" firebase collection
    const q = query(collection(db, "users"),where("displayName", "==", username));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // If the desired user has been found from the query above, this will setUser
        setUser(doc.data())
      });
      // If user is not found catch will run indicating error, user was not found
    } catch(err) {
      setErr(true);
    }
  };

  // Function for key inputs
  const handleKey = (e)=> {
    e.code === "Enter" && handleSearch();
  };

  // Function for selecting and adding users to new database that stores chat messages between users
  const handleSelect = async ()=> {
    // check whether the chat group(named "chats" collection in firestore) currently exists, if not create a new chat using the combined IDs of the users involved example: combines the user ID of Lydia and Karlie for their chat group.
    // Note: Ternary operator is used here
    const combinedId = currentUser.uid > user.uid 
    ? currentUser.uid + user.uid 
    : user.uid + currentUser.uid;
    try {
      const res = await getDocs(db, "chats", combinedId);
      
      // If there is NO response, which means no existing chat between users involved inside "chats" collection on firebase, a new one will be created
      if(!res.exists()){
        // creates chat in chat collection with an empty array for messages
        await setDoc(doc(db, "chats", combinedId), {messages:[]}) 

        // create user chats with the following data from firebase:
        // user's photo, displayName, most recent message
        // result will be sorted by date using firebase method serverTimestamp since this also accounts for time zone differences instead of just using time.now
        // This is for the currentUser
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId+".userInfo"]: {
            uid:user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedId+".date"]: serverTimestamp()
        });
        // This second await method is for the other's users chat and messages. To ensure that they are updated as well.
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId+".userInfo"]: {
            uid:currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId+".date"]: serverTimestamp()
        });
      }
    }catch (err) {}
    // Create user chats
  };

  return (
    <div className="search">
      <div className="searchForm">
        {/* onChange - used to look for user based on text input in search bar */}
        {/* onKeyDown - Listener for key inputs*/}
        <input type="text" placeholder="Find A User" onKeyDown={handleKey} onChange={e=>setUsername(e.target.value)} />
      </div>
      {/* The below div with photo and display name will only generate if user is found and selected from above query and listener */}
      {/* If user is not found error handling will generate span - User not found message to user */}
      {err && <span>User not found!</span> }
      {user && <div className="userChat">
        <img src={user.photoURL} alt="" onClick={handleSelect}/>
        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search