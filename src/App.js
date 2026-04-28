import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import SkillInput from "./components/SkillInput";
import Dashboard from "./components/Dashboard";

function App() {
  const [data, setData] = useState(null);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-900 min-h-screen">
        <Navbar />
        <div className="p-6">
          <SkillInput setData={setData} />
          <Dashboard data={data} />
        </div>
      </div>
    </div>
  );
}

export default App;
