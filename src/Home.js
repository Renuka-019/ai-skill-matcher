import React, { useState } from "react";

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
      console.log("API DATA:", data); // 🔥 DEBUG

      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Backend not working ❌");
    }
  };

  return (
    <div className="container">
      <div className="card">

        <h1>🚀 AI Skill Matcher</h1>

        <input
          placeholder="Skills"
          onChange={(e) => setSkills(e.target.value)}
        />

        <input
          placeholder="Interests"
          onChange={(e) => setInterests(e.target.value)}
        />

        <button onClick={handleSubmit}>Find</button>

        <button
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
            window.location.href = "/";
          }}
        >
          Logout
        </button>

        {/* ✅ SAFE RENDERING */}
        {result && (
          <div className="results">

            <h3>🎯 Roles</h3>
            <ul>
              {result.recommended_roles
                ? result.recommended_roles.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))
                : <li>No roles</li>}
            </ul>

            <h3>📚 Courses</h3>
            <ul>
              {result.courses
                ? result.courses.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))
                : <li>No courses</li>}
            </ul>

          </div>
        )}

      </div>
    </div>
  );
}

export default Home;
