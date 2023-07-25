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
  const fetchDirectAff = async (email) => {
    try {
      const values = {
        email: email,
      };
      const response = await fetch(`http://localhost:5000/all-referrals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      // Check if cookies are already set
      const existingRefCookie = Cookies.get("ref");
      const obj = {
        paid: data.nonNullPackageCount,
        unpaid: data.nullPackageCount,
        allRefLength: data.allRefLength,
      };

      if (!existingRefCookie) {
        // If the 'ref' cookie doesn't exist, set it
        Cookies.set("ref", JSON.stringify(obj), {
          expires: 7,
          secure: true,
          sameSite: "strict",
        });
      } else {
        // If the 'ref' cookie already exists, update its value
        const existingRefObj = JSON.parse(existingRefCookie);
        Object.assign(existingRefObj, obj);
        Cookies.set("ref", JSON.stringify(existingRefObj), {
          expires: 7,
          secure: true,
          sameSite: "strict",
        });
      }

      // Update the global state with the fetched data
      setGlobalState("allReferralsLength", data.allRefLength);
      setGlobalState("paid", data.nonNullPackageCount);
      setGlobalState("unpaid", data.nullPackageCount);
    } catch (error) {
      // Handle any errors
    }
  };

  useEffect(() => {
    console.log("checking");
    const checkLoginStatus = () => {
      const token = Cookies.get("authToken");

      if (token) {
        const userData = Cookies.get("user");
        var data2 = JSON.parse(userData);
        fetchDirectAff(data2.email);
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
