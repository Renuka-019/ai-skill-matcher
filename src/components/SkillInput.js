import { useState } from "react";
import { matchSkills } from "../services/api";

export default function SkillInput({ setData }) {
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [domain, setDomain] = useState("AI");

  const handleSubmit = async () => {
    const res = await matchSkills({ skills, interests, domain });
    setData(res.data);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl text-white">
      <input className="p-2 m-2 text-black" placeholder="Skills" onChange={e => setSkills(e.target.value)} />
      <input className="p-2 m-2 text-black" placeholder="Interests" onChange={e => setInterests(e.target.value)} />
      
      <select className="p-2 m-2 text-black" onChange={e => setDomain(e.target.value)}>
        <option>AI</option>
        <option>Web</option>
        <option>Data</option>
        <option>App</option>
      </select>

      <button onClick={handleSubmit} className="bg-blue-500 p-2 rounded">Analyze</button>
    </div>
  );
}
