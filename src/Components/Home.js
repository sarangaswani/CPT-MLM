import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import SignIn from "../Components/Register/SignIn";
import {  Routes, Route } from "react-router-dom";
function Home() {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* <Route exact path='/Dashboard' element={<Dashboard/>}/>   */}
        <Route exact path="/SignIn" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default Home;
