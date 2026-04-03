import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

const handleSignup = async () => {
  if (!email || !password) {
    alert("Please fill all fields ❗");
    return;
  }

  try {
    const res = await fetch("https://ai-skill-matcher.onrender.com/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.status === 200) {
      alert("Signup successful ✅");
      navigate("/");
    } else {
      alert("User already exists ❌");
    }

  } catch {
    alert("Server error 😅");
  }
};
  return (
    <div className="container">

      <div className="left">
        <h1>Create Account 🚀</h1>
      </div>

      <div className="right">
        <div className="card">
          <h2>Signup</h2>

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="button" onClick={handleSignup}>
            {loading ? "Creating..." : "Signup"}
          </button>
        </div>
      </div>

    </div>
  );
}

export default Signup;
