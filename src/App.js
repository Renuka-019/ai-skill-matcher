import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>

        {/* 🔐 Default → Login */}
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

        {/* 📝 Signup */}
        <Route path="/signup" element={<Signup />} />

        {/* 🚀 Protected Home */}
        <Route
          path="/home"
          element={
            isLoggedIn ? <Home /> : <Navigate to="/" />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
