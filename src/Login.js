import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch("https://ai-skill-matcher.onrender.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.message === "Login successful") {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/home");
    } else {
      alert("Invalid login");
    }
  };

  return (
    <div className="container">

      {/* LEFT SIDE */}
      <div className="left">
        <h1>Welcome Back 👋<br/>AI Skill Matcher</h1>
      </div>

      {/* RIGHT SIDE */}
      <div className="right">
        <div className="card">
          <h2>Login</h2>

          <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

          <button onClick={handleLogin}>Login</button>

          <p>
            Don't have account? <a href="/signup">Signup</a>
          </p>
        </div>
      </div>

    </div>
  );
}

export default Login;
