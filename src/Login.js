import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("Login clicked");

    if (!email || !password) {
      alert("Please fill all fields");
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

      const data = await res.json();
      console.log(data);

      if (data.message === "Login successful") {
        localStorage.setItem("isLoggedIn", "true");
        navigate("/home");
      } else {
        alert(data.message || "Invalid login");
      }
    } catch (err) {
      console.error(err);
      alert("Server is slow or down 😅 Try again");
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

          <button type="button" onClick={handleLogin}>
            {loading ? "Please wait..." : "Login"}
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
