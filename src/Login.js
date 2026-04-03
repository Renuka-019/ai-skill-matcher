import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("Login clicked");

    try {
      const res = await fetch("https://ai-skill-matcher.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log(data);

      if (data.message === "Login successful") {
        localStorage.setItem("isLoggedIn", "true");
        navigate("/home");
      } else {
        alert("Invalid login");
      }
    } catch (err) {
      alert("Backend error ❌");
    }
  };

  return (
    <div className="container">
      <div className="left">
        <h1>Welcome Back 👋</h1>
      </div>

      <div className="right">
        <div className="card">
          <h2>Login</h2>

          <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

          <button type="button" onClick={handleLogin}>Login</button>

          <p>
            Don't have account? <a href="/signup">Signup</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
