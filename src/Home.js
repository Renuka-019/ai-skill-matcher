import React, { useState } from "react";
import { motion } from "framer-motion";

function Home() {
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
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
  };

  return (
    <div className="container">
      <motion.div className="card" initial={{ y: 50 }} animate={{ y: 0 }}>
        <h1>🚀 AI Skill Matcher</h1>

        <input placeholder="Skills" onChange={(e) => setSkills(e.target.value)} />
        <input placeholder="Interests" onChange={(e) => setInterests(e.target.value)} />

        <button onClick={handleSubmit}>Find Opportunities</button>

        <button
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
            window.location.href = "/";
          }}
        >
          Logout
        </button>

        {result && (
          <div className="results">
            <h3>🎯 Roles</h3>
            <ul>
              {result.recommended_roles.map((r, i) => <li key={i}>{r}</li>)}
            </ul>

            <h3>📚 Courses</h3>
            <ul>
              {result.courses.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Home;
