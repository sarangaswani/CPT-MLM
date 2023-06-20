import logo from './logo.svg';
import './App.css';
import Hero from './Components/HeroSection/Hero'
import Card from './Components/HeroSection/Card';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Home from './Components/HeroSection/Home';
import CompanyOverview from './Components/CompanyOverview/CompanyOverview';
import CoreValuesSlider from './Components/CoreValues/CoreValueSlider';
import Dashboard from './Components/Dashboard/Dashboard';
import Shop from './Components/Dashboard/Shop';
import Main from './Components/Dashboard/Main';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     
     {/* <Home/>
     <CompanyOverview/>
     <CoreValuesSlider/>
     <RegisterForm/> */}
     
     <Routes>
     <Route exact path='/' element={<Home/>}/>  
     <Route exact path='/Dashboard' element={<Dashboard/>}/>  
     {/* <Route exact path='/' element={<Home/>}/>   */}
       
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
