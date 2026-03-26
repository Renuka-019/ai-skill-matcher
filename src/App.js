import React, { useState } from "react";

function App() {
  const [result, setResult] = useState(null);

  const connectBackend = async () => {
    try {
      const response = await fetch(
        "https://ai-skill-matcher.onrender.com/api/match",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            skills: ["Python", "React"],
            interests: ["AI", "Web Development"],
          }),
        }
      );

      const data = await response.json();
      console.log("Backend response:", data);
      setResult(data);
    } catch (error) {
      console.error("Error connecting backend:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>AI Skill Matcher 🚀</h1>

      <button onClick={connectBackend}>
        Connect Backend
      </button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
