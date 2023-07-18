import React, { useContext } from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from '../Context/AuthContext';

const Navbar = () => {
  const {currentUser} = useContext(AuthContext);

  return (
    <div className="navbar">
      <span className="logo">Earth Alliance Messaging</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        {/* signOut function being called on listener is from firebase */}
        <button onClick={()=>signOut(auth)}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar