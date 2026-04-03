import React, { useState } from "react";
import { FaUser, FaHome, FaBook, FaSignOutAlt } from "react-icons/fa";

function Home() {
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    try {
      const res = await fetch("https://ai-skill-matcher.onrender.com/api/match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skills: skills.split(","),
          interests: interests.split(","),
        }),
      });

      const data = await res.json();
      setResult(data);
    } catch {
      alert("Server error ❌");
    }
  };

  return (
    <div className="app">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>🚀 AI Matcher</h2>

        <div className="menu">
          <p><FaHome /> Dashboard</p>
          <p><FaUser /> Profile</p>
          <p><FaBook /> Courses</p>
        </div>

        <button
          className="logout"
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
            window.location.href = "/";
          }}
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="main">

        {/* NAVBAR */}
        <div className="topbar">
          Welcome 👋
        </div>

        {/* INPUT CARD */}
        <div className="card">
          <h2>Find Your Career Path</h2>

          <input
            placeholder="Enter skills (Python, React)"
            onChange={(e) => setSkills(e.target.value)}
          />

          <input
            placeholder="Enter interests"
            onChange={(e) => setInterests(e.target.value)}
          />

          <button onClick={handleSubmit}>Find Matches</button>
        </div>

        {/* RESULTS */}
        {result && (
          <div className="results-grid">

            <div className="result-card">
              <h3>🎯 Roles</h3>
              <ul>
                {result.recommended_roles?.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>

            <div className="result-card">
              <h3>📚 Courses</h3>
              <ul>
                {result.courses?.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default Home;
