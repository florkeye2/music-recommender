import { Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import "./tailwind.css"

function App() {
  return (
    <Routes>
      <Route path="/register" element={<h1>Register Here!</h1>}/>
      <Route path="/login" element={<h1>Login Here!</h1>}/>
      <Route path="/home" element={<MainPage/>}/>
    </Routes>
  );
}

export default App;