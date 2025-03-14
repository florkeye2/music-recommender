import { Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import "./tailwind.css"

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage/>}/>
      <Route path="/login" element={<h1>Login Here!</h1>}/>
    </Routes>
  );
}

export default App;