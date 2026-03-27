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
      const response = await fetch(
        "https://ai-skill-matcher.onrender.com/api/match",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            skills: skills.split(",").map(s => s.trim()),
            interests: interests.split(",").map(i => i.trim()),
          }),
        }
      );

      const data = await response.json();

      setResult({
        skill_score: data.skill_score || "85%",
        level: data.level || "Intermediate",
        matches: data.recommended_roles || [],
        courses: data.courses || [],
      });

    } catch (error) {
      alert("Error connecting to backend ❌");
    }

    setLoading(false);
  };

  return (
    <div className="container">

      <h1>🚀 AI Skill Matcher</h1>

      <div className="card">

        <input
          placeholder="Enter skills (Python, React...)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        <input
          placeholder="Enter interests (AI, Web...)"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
        />

        <button onClick={handleSubmit}>
          {loading ? "Matching..." : "Find Opportunities"}
        </button>

        {loading && <p>Loading...</p>}

        {result && (
          <div className="results">

            <div>
              <p><b>Score:</b> {result.skill_score}</p>
              <p><b>Level:</b> {result.level}</p>
            </div>

            <h3>🎯 Roles</h3>
            <ul>
              {result.matches.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>

            <h3>📚 Courses</h3>
            <ul>
              {result.courses.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>

          </div>
        )}

      </div>
    </div>
  );
}

export default App;
