import React from 'react';
import Add from "../Images/addAvatar.png";

const Register = () => {
  return (
    <div className="formContainer">
        <div className="formWrapper">
            <span className="logo">Earth Messaging System</span>
            <span className="title">Register</span>
            <form>
                <input type="text" placeholder="Enter A Display Name" />
                <input type="email" placeholder="Enter Your Email" />
                <input type="password" placeholder="Create A Password" />
                <input className="fileUploadOriginal" type="file" id="file"/>
                <label htmlFor="file">
                    <img src={Add} alt="" />
                    <span>Add an avatar</span>
                </label>
                <button>Sign Up</button>

                <p>If you already have an account? Login here</p>
            </form>
        </div>
    </div>
  )
}

export default Register