import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear all items from localStorage
    localStorage.clear();
    // Navigate programmatically without full page reload
    navigate("/login");
  }, [navigate]);

  // Component renders nothing as it's only used for logout side effects
  return null;
};

export default Logout;
