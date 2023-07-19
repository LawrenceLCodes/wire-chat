// Authentication context is used so that current user iis not shared everywhere but only where needed
import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    // Import currentUser
    const {currentUser} = useContext(AuthContext);
    // useReducer's initial state on load
    const INITIAL_STATE = {
        chatId: "null",
        user: {},
    };

    const chatReducer = (state, action) => {
        // Used to update the user's chat using state and dispatch
        switch(action.type){
            case "CHANGE_USER":
                return{
                    user: action.payload,
                    chatId: 
                        currentUser.uid > action.payload.uid
                            ? currentUser.uid + action.payload.uid
                            : action.payload.uid + currentUser.uid,
                };
            default: 
                return state;
        }
    };

    // Get state and dispath and send it below to bne used in any component
    const [state,dispatch] = useReducer(chatReducer,INITIAL_STATE);
    
    return(
        // Wraps component with authContext provider, by sending the value of current user any component that is wrapped with the authContext will have access to currentUser value. Currently wrapping the application in index.js 
        <ChatContext.Provider value={{ data:state, dispatch }}>
            {children}
        </ChatContext.Provider>
    );
};