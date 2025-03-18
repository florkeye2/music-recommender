import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import "./tailwind.css"

function App() {
  return (
    <Routes>
      <Route path="/register" element={<h1>Register Here!</h1>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
  );
}

export default App;