import logo from "./logo.svg";
import "./App.css";
import Hero from "./Components/HeroSection/Hero";
import Card from "./Components/HeroSection/Card";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import LandinPage from "./Components/HeroSection/LandinPage";
import Dashboard from "./Components/Dashboard/Dashboard";
import Shop from "./Components/Dashboard/Shop";
import Main from "./Components/Dashboard/Main";
import Register from "./Components/Register/Register";
import { useEffect, useState } from "react";
import Session from "react-session-api"; // Import Session
import Cookies from "js-cookie";
import { setGlobalState } from "./store/global";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const userData = Cookies.get("user");
  var data2 = JSON.parse(userData);
  const fetchDirectAff = async () => {
    const values = {
      email: data2.email,
    };
    const response = await fetch(`http://localhost:5000/all-referrals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    setGlobalState("allReferralsLength", data.allRefLength);
    setGlobalState("paid", data.nonNullPackageCount);
    setGlobalState("unpaid", data.nullPackageCount);

    // setallReferrals(data.allReferralObjects);
    // setPaid(data.nonNullPackageCount);
    // setUnPaid(data.nullPackageCount);
    console.log(data);
  };

  useEffect(() => {
    console.log("checking");
    const checkLoginStatus = () => {
      const token = Cookies.get("authToken");

      if (token) {
        fetchDirectAff();
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
          <Route path="/" element={<LandinPage />} />
          <Route path="/GetStarted/*" element={<Home />} />
          <Route path="/Dashboard/*" element={<Dashboard />} />
          {/* <Route exact path='/' element={<Home/>}/>   */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
