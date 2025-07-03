import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phone.trim()) {
      localStorage.setItem("userPhone", phone);
      navigate("/"); // Redirect to home after login/register
    }
  };

  return (
    <div className="auth-container" style={{ padding: "50px", textAlign: "center" }}>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
        <input
          type="tel"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
      <p style={{ marginTop: "20px" }}>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button onClick={() => setIsLogin(!isLogin)} style={{ background: "none", color: "blue", border: "none", cursor: "pointer" }}>
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
    </div>
  );
}

export default Auth;
