import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token); // Set authentication status based on token
  }, []);

  const logout = () => {
    setIsAuthenticated(false);
    navigate("/logout");
  };

  const checkISAuthenticated = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, logout, checkISAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
