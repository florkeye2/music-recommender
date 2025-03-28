import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/LoginPage";
import LogoutPage from "./components/LogoutPage";
import "./tailwind.css"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace/>} />
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/logout" element={<LogoutPage/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
  );
}

export default App;