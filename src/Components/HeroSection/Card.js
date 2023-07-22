import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';

const Card = () => {
  return (
    <div className="max-w-md md:max-w-md mx-auto md:float-right md:mt-4 md:mr-4 rounded-xl shadow-md overflow-hidden group bg-gradient-to-br from-purple-950 to-MiddlePurple dark:text-white ">
      <div className="p-8 flex-grow">
        <div className="uppercase tracking-wide text-sm text-indigo-100 font-semibold text-center">
          PC
        </div>
        <div className="text-center mt-3 font-semibold text-indigo-100">
          <a
            href="/"
            className="block my-1 text-lg leading-tight font-medium text-indigo-100 hover:underline"
          >
            Driving Innovation in Web3 Technology
          </a>
          <br />
          <p>Unlock the Power of Decentralization</p>
          <br />
          <p>EXPLORE - CREATE - COLLABORATIVE</p>
          <br />
          <p>Join the Revolution Today!</p>
          <Link to="/GetStarted">
            <button className="relative mt-8 inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white ">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Get Started
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
