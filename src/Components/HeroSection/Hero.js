import React from 'react';
import Card from './Card';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <div className="relative h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-gradient-to-br from-customPurple via-MiddlePurple to-customPurple "
        style={{
          backgroundImage: "url('choong-deng-xiang-GEONQEnR_3A-unsplash.jpg')",
          // WebkitMaskImage: "linear-gradient(black, transparent)",
          // maskImage: "linear-gradient(black, transparent)",
        }}
      >
        {/* <img src="/choong-deng-xiang-GEONQEnR_3A-unsplash.jpg" alt="" className="hero-image"/> */}
      </div>
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="relative z-10 py-10 md:py-20 lg:py-32">
          <h1 className="text-4xl sm:text-5xl md:text-6xl text-white font-bold leading-tight mb-6 animated-b1">
            ProsperChain
          </h1>
          <Card />
        </div>
        <div className="absolute sm:bottom-[32px]  bottom-[16px] left-7  sm:left-8 md:left-10 animated-b2">
          <button className="relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Whitepaper
            </span>
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 right-4 sm:right-8 md:right-10 flex justify-start ml-4 sm:ml-8 md:ml-10 mb-4 sm:mb-8 md:mb-10 animated-button">
        <button className="relative inline-flex items-center justify-between p-0.5 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            How To Buy
          </span>
        </button>
        <button className="relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Roadmap
          </span>
        </button>
        <button className="relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            About
          </span>
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
