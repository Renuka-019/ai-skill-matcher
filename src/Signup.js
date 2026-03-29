import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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

  localStorage.setItem("isLoggedIn", "true"); // ✅ auto login
  navigate("/home"); // ✅ go to main page
};

  return (
    <div className="container">
      <motion.div className="card" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
        <h2>📝 Signup</h2>

        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

        <button onClick={handleSignup}>Signup</button>
      </motion.div>
    </div>
  );
}

export default Signup;
