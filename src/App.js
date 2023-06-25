import logo from "./logo.svg";
import "./App.css";
import Hero from "./Components/HeroSection/Hero";
import Card from "./Components/HeroSection/Card";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Homie from "./Components/HeroSection/Home";
import Dashboard from "./Components/Dashboard/Dashboard";
import Shop from "./Components/Dashboard/Shop";
import Main from "./Components/Dashboard/Main";
import Register from "./Components/Register/Register";
import { useEffect, useState } from "react";
import Session from "react-session-api"; // Import Session
import Cookies from "js-cookie";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = Cookies.get("authToken");

      if (token) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        {/* <Home/>
    
     <RegisterForm/> */}

        <Routes>
          <Route path="/" element={<Homie />} />
          <Route path="/GetStarted/*" element={<Home />} />
          <Route path="/Dashboard/*" element={<Dashboard />} />
          {/* <Route exact path='/' element={<Home/>}/>   */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
