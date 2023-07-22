import React from 'react';
import Card from './Card';
import './HeroSection.css';
import Logo from "../../assets/logo.png"


const HeroSection = () => {
  return (
    <div className="HeroSection h-screen flex flex-col justify-between relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('choong-deng-xiang-GEONQEnR_3A-unsplash.jpg')",
        }}
      />
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
      <div className="flex flex-row justify-center mt-20 ">
          <img src={Logo} alt="ProsperChain Logo" className="h-16 w-16 mb-4" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl text-white font-bold leading-tight mb-6 animated-b1">
            ToPayCoin
          </h1>
         
          <Card />
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10 flex flex-row justify-between items-end pb-8">
        <button className="relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Whitepaper
          </span>
        </button>
        <button className="relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Roadmap
          </span>
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
