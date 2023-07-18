import { React, useState } from "react";
import { useNavigate } from "react-router-dom"; 
// import Add from "../Images/addAvatar.png";

const Login = () => {
  const [error,setError] = useState(false);
  // For navigating react router routes
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // To prevent page from refreshing when registration form is submitted
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    // For error handling
    try {
      

    } catch(error) {
      setError(true);
    }
  };



  return (
    <div className="formContainer">
        <div className="formWrapper">
            <span className="logo">Earth Messaging System</span>
            <span className="title">Login</span>
            <form onSubmit={handleSubmit}>
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