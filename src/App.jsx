import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import Login from "./components/auth/Login.jsx";
import "./App.css";
import Main from "./components/layout/Main.jsx";
export default function App() {
  const hasSessionId = !!sessionStorage.getItem("sessionId");
  const navigate = useNavigate();
  useEffect(() => {
    if (!hasSessionId) {
      navigate("/");
    }
  }, [hasSessionId, navigate]);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main/*" element={<Main />} />
      </Routes>
    </div>
  );
}
