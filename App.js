import React, { useState } from "react";
import "./App.css";

function App() {
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("https://ai-skill-matcher.onrender.com/match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ skills, interests }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert("Error connecting to backend");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <div className="card">

        <h1>🚀 AI Skill Matcher</h1>

        <input
          placeholder="Enter skills (Python, ML...)"
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

        {loading && <div className="loader"></div>}

        {result && (
          <div className="results">
            <div className="summary">
              <p><b>Score:</b> {result.skill_score}</p>
              <p><b>Level:</b> {result.level}</p>
            </div>

            <div className="section">
              <h3>🎯 Matches</h3>
              <ul>
                {result.matches.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>

            <div className="section">
              <h3>📚 Courses</h3>
              <ul>
                {result.courses.map((c, i) => (
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

export default App;