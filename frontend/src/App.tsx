import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import "./tailwind.css"

function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
  );
}

export default App;