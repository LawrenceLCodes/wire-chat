import { React, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; 
// import Add from "../Images/addAvatar.png";

const Login = () => {
  const [err,setErr] = useState(false);
  // For navigating react router routes
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // To prevent page from refreshing when registration form is submitted
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    // For error handling
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch(error) {
      setErr(true);
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
                
                {err && <span>Something went wrong!</span>}

                <p>If you do not have an account? <Link to="/register">Register</Link></p>
            </form>
        </div>
    </div>
  )
}

export default Login