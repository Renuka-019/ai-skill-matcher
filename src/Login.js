import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("Login clicked");

    // 🔴 validation
    if (!email || !password) {
      alert("Please fill all fields ❗");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://ai-skill-matcher.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // 🔥 IMPORTANT FIX (status based)
      if (res.status === 200) {
        localStorage.setItem("isLoggedIn", "true");
        alert("Login successful ✅");
        navigate("/home");
      } else if (res.status === 401) {
        alert("Invalid email or password ❌");
      } else {
        alert("Something went wrong ⚠️");
      }

    } catch (err) {
      console.error(err);
      alert("Server slow or down 😅");
    }

    setLoading(false);
  };

  return (
    <div className="container">

      <div className="left">
        <h1>Welcome Back 👋</h1>
      </div>

      <div className="right">
        <div className="card">

          <h2>Login</h2>

          <input
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="button" onClick={handleLogin}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p>
            Don't have account?{" "}
            <a href="/signup">Signup</a>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Login;
