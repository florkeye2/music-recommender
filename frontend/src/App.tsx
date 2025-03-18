import { Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import "./tailwind.css"

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;