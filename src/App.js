import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/HeroSection/Hero";
import Card from "./Components/HeroSection/Card";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./Components/Register/Login";
import Home from "./Components/HeroSection/Home";
import RegisterForm from "./Components/Register/Register";
import CompanyOverview from "./Components/CompanyOverview/CompanyOverview";
import CoreValuesSlider from "./Components/CoreValues/CoreValueSlider";
import Dashboard from "./Components/Dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Home />
        <CompanyOverview />
        <CoreValuesSlider />
        <RegisterForm />
        <Dashboard />
        <Routes>
          {/* <Route exact path='/Login' element={<RegisterForm/>}/> 
          {/* <Route exact path='/' element={<Home/>}/>   */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
