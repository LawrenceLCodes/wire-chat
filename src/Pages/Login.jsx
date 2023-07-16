import React from 'react';
import Add from "../Images/addAvatar.png";

const Login = () => {
  return (
    <div className="formContainer">
        <div className="formWrapper">
            <span className="logo">Earth Messaging System</span>
            <span className="title">Login</span>
            <form>
                <input type="email" placeholder="Enter Your Email" />
                <input type="password" placeholder="Create A Password" />
                <button>Sign In</button>

                <p>If you do not have an account? Register</p>
            </form>
        </div>
    </div>
  )
}

export default Login