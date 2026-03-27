import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import "./App.css";

function Home({ skills, interests, setSkills, setInterests, handleSubmit, result, loading }) {
  return (
    <div className="card">
      <h1>🚀 AI Skill Matcher</h1>

      <input
        placeholder="Enter skills"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />

      <input
        placeholder="Enter interests"
        value={interests}
        onChange={(e) => setInterests(e.target.value)}
      />

      <button onClick={handleSubmit}>
        {loading ? "Matching..." : "Find Opportunities"}
      </button>

      {result && (
        <div className="results">
          <h3>🎯 Roles</h3>
          <ul>
            {result.matches.map((m, i) => <li key={i}>{m}</li>)}
          </ul>

          <h3>📚 Courses</h3>
          <ul>
            {result.courses.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

function App() {
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

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

    setResult({
      matches: data.recommended_roles,
      courses: data.courses,
    });

    setLoading(false);
  };

  return (
    <BrowserRouter>

      {/* 🔥 NAVBAR */}
      <div style={{ marginBottom: "20px" }}>
        <a href="/" style={{ marginRight: "10px" }}>Home</a>
        <a href="/login" style={{ marginRight: "10px" }}>Login</a>
        <a href="/signup">Signup</a>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <Home
              skills={skills}
              interests={interests}
              setSkills={setSkills}
              setInterests={setInterests}
              handleSubmit={handleSubmit}
              result={result}
              loading={loading}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
