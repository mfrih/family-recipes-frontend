import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_URL = "http://localhost:5005";

//  1 : creates the auth Context object
export const AuthContext = createContext();

const AuthProviderWrapper = ({ children }) => {
  // 2 : creats state variables for storing user info and authentication state
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // adds use navigate to be used in the logOutUser function later on
  const navigate = useNavigate();

  // 3 : functions handling authentication logic
  //function that stores the token
  const storeToken = (authToken) => {
    localStorage.setItem("authToken", authToken);
  };

  //function that authenticates user based on token
  const authenticateUser = () => {
    // get the stored token from the localStorage
    const storedToken = localStorage.getItem("authToken");
    // if there is a token in the localStorage
    if (storedToken) {
      // verify the token with the server
      axios
        .get(`${API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          // if the token is valid,
          const user = response.data;
          // update state variables
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);
        })
        .catch((error) => {
          // handle errors (e.g., invalid token)
          if (error) {
            setAuthError(error.response.data.message);
            return;
          }
          // if the server send an error response then update state variables
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });
    } else {
      // if there is no token
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  //function that removes token
  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  //function that logs out the user
  const logOutUser = () => {
    setIsLoggedIn(false);
    setUser(null);
    removeToken();
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
        authError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProviderWrapper;
