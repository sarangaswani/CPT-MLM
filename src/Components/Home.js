import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import SignIn from "../Components/Register/SignIn";
import {  Routes, Route } from "react-router-dom";
import Register from './Register/Register'
function Home() {
  
  return (
    <div>
      <Navbar />
      <Routes>
        {/* <Route exact path='/Dashboard' element={<Dashboard/>}/>   */}
        <Route exact path="" element={<SignIn />} />
        <Route exact path="Register" element={<Register />} />
        <Route exact path="SignIn" element={<SignIn />} />

      </Routes>
    </div>
  );
}

export default Home;
