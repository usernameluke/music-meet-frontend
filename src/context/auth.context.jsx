import React, { useState, useEffect } from "react";
import authService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const navigate = useNavigate();
  const [isProfileDeleted, setIsProfileDeleted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = () => {
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem("authToken");
    setIsProfileDeleted(false);
    
    // If the token exists in the localStorage
    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
      authService
        .verify()
        .then((response) => {
          // If the server verifies that JWT token is valid  ✅
          const user = response.data;
          // Update state variables
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);
        })
        .catch(() => {
          // If the server sends an error response (invalid token) ❌
          // Update state variables
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });
    } else {
      // If the token is not available
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  const removeToken = () => {
    // Upon logout, remove the token from the localStorage
    localStorage.removeItem("authToken");
  };

  const logOutUser = () => {
    removeToken();
    authenticateUser();
  };

  const deleteUser = async () => {
    try {
      const res = await authService.deleteUser();
      removeToken();
      setUser(null)
      setIsProfileDeleted(true)
      setIsLoggedIn(false)
    }
    catch(error){
      console.error('error:',error)
    }

   
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("authToken");
  //   if (token) {
  //     setIsLoggedIn(true);
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, [navigate]);

  useEffect(() => {
    // Run the function after the initial render,
    // after the components in the App render for the first time.
    authenticateUser();
  }, []);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate("/events");
  //   }
  // }, [isLoggedIn, navigate]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        isProfileDeleted,
        user,
        setUser,
        storeToken,
        authenticateUser,
        logOutUser,
        deleteUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
