import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import { useState, useEffect } from "react";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import Register from "./components/Register/Register";
import Admin from "./components/Admin/Admin";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`App ${theme}`}>
      <BrowserRouter>
        <NavBar />
        <div style={{ position: "absolute", right: "5%", top: "20%" }}>
          <button
            onClick={toggleTheme}
            style={{
              color: "white",
              backgroundColor: theme === "light" ? "#000" : "#fff",
              borderColor: "transparent",
            }}
          >
            {theme === "light" ? "🔆" : "🌙"}
          </button>
        </div>
        <Routes>
          <Route path="/" element={<h1>Welcome</h1>} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
