import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    await fetch("https://ai-skill-matcher.onrender.com/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    localStorage.setItem("isLoggedIn", "true");
    navigate("/home");
  };

  return (
    <div className="container">

      <div className="left">
        <h1>Create Account 🚀</h1>
      </div>

      <div className="right">
        <div className="card">
          <h2>Signup</h2>

          <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

          <button onClick={handleSignup}>Signup</button>
        </div>
      </div>

    </div>
  );
}

export default Signup;
