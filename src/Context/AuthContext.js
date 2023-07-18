// Authentication context is used so that current user iis not shared everywhere but only where needed
import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(()=> {
        // On state change look for a user or not, if so setCurrentUser
        // Listening for state change
        const unsub = onAuthStateChanged(auth, (user)=> {
            setCurrentUser(user);
            console.log(user);
        });
        // clean up function to avoid memory leaks
        return () => {
            unsub();
        };
    }, []);

    return(
        // Wraps component with authContext provider, by sending the value of current user any component that is wrapped with the authContext will have access to currentUser value. Currently wrapping the application in index.js 
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};