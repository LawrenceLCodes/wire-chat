import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";
import { useContext } from "react";
import "./style.scss";

function App() {
  const {currentUser} = useContext(AuthContext)

  // Protected route to check for login. This will keep users not logged in from accessing home chat page
  const ProtectedRoute = ({children}) => {
    if(!currentUser) {
      return <Navigate to="/login" />
    }

    return children;
  }

  return (
    // React Router
    <BrowserRouter>
      <Routes>
        <Route path="/">
          {/* Home page */}
          {/* <Route index element={currentUser ? <Home /> : <Login />} /> */}
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          {/* Login path */}
          <Route path="login" element={<Login />} />
          {/* Registration path */}
          <Route path="Register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
