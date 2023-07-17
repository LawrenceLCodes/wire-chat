import { React, useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, storage } from "../firebase";
import Add from "../Images/addAvatar.png";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Register = () => {
  const [error,setError] = useState(false);
  const handleSubmit = async (e) => {
    // To prevent page from refreshing when registration form is submitted
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    // This is to take the first file selected by the user
    const file = e.target[3].files[0];

    // For error handling
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // The image files will be renamed using the user's display name for storage.
      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on( 
        (error) => {
          // Error handling for unsuccessful image uploads
          setError(true);
        }, 
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
          });
        }
      );
    } catch(error) {
      setError(true);
    }
  };

  return (
    <div className="formContainer">
        <div className="formWrapper">
            <span className="logo">Earth Messaging System</span>
            <span className="title">Register</span>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter A Display Name" />
                <input type="email" placeholder="Enter Your Email" />
                <input type="password" placeholder="Create A Password" />
                <input className="fileUploadOriginal" type="file" id="file"/>
                <label htmlFor="file">
                    <img src={Add} alt="" />
                    <span>Add an avatar</span>
                </label>
                <button>Sign Up</button>
              {error && <span>Something went wrong!</span>}
            </form>
            <p>If you already have an account? Login here</p>
        </div>
    </div>
  )
}

export default Register