import React from "react";
import Hero from "./Hero";
import Navbar from "../Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "../Register/SignIn";

function Home() {
  return (
    <div>
      <Navbar />
      {/* <Hero/> */}
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        {/* <Route exact path='/' element={<Home/>}/>   */}
      </Routes>
    </div>
  );
}

export default Home;
