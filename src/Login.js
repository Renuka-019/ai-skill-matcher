import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {
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
      setIsLoggedIn(true);
      navigate("/home"); // 🚀 redirect
    } else {
      alert("Invalid login");
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleLogin}>Login</button>

      <p>
        Don't have an account?{" "}
        <a href="/signup">Signup</a>
      </p>
    </div>
  );
}

export default Login;
