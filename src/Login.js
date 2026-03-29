import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
      navigate("/home");
    } else {
      alert("Invalid login");
    }
  };

  return (
    <div className="container">
      <motion.div className="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2>🔐 Login</h2>

        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />

        <button onClick={handleLogin}>Login</button>

        <p>
          Don't have an account? <a href="/signup">Signup</a>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
