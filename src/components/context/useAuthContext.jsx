import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUserRaw] = useState(undefined); // undefined = loading, null = logged out, object = logged in
  const navigate = useNavigate();

  // Load from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("userInfo");
    setIsAuthenticated(!!token);
    if (storedUser) {
      setUserRaw(JSON.parse(storedUser));
    } else {
      setUserRaw(null);
    }
  }, []);

  // When user is set, sync with localStorage
  const setUser = (user) => {
    setUserRaw(user);
    if (user) {
      localStorage.setItem("userInfo", JSON.stringify(user));
    } else {
      localStorage.removeItem("userInfo");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("authToken");
    navigate("/logout");
  };

  const checkISAuthenticated = () => {
    const token = localStorage.getItem("authToken");
    return !!token;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        logout,
        checkISAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
