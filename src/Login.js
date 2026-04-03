import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("https://ai-skill-matcher.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("STATUS:", res.status);

      if (res.status === 200) {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "/home";
      } else {
        alert("Invalid credentials ❌");
      }

    } catch (err) {
      console.error(err);
      alert("Server error 😅");
    }
  };

  // ✅ RETURN MUST BE INSIDE FUNCTION
  return (
    <div className="container">

      <div className="left">
        <h1>Welcome Back 👋</h1>
      </div>

      <div className="right">
        <div className="card">

          <h2>Login</h2>

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

          <button onClick={handleLogin}>
            {loading ? "Logging..." : "Login"}
          </button>

          <p>
            Don't have account? <a href="/signup">Signup</a>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Login;
