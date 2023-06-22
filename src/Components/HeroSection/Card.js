import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom/dist';
const Card = () => {
  
  return (
    <div
    className="max-w-xs rounded-xl shadow-md overflow-hidden md:max-w-md hover:shadow-xl transition duration-300 flex flex-col absolute top-24 right-10 w-full group bg-gradient-to-br from-purple-950 to-MiddlePurple dark:text-white "
  >
      <div className="p-8 flex-grow">
        <div className="uppercase tracking-wide text-sm text-indigo-100 font-semibold text-center">
          PC
        </div>
        <div className="text-center mt-3 font-semibold text-indigo-100">
          <a
            href="/"
            className="block my-1 text-lg leading-tight font-medium text-indigo-100 hover:underline"
          >
            The Original Meme Coin!
          </a>
          <p>Sheep is the world’s first decentralized meme platform.</p>
          <p>CREATE – POST – SHARE</p>
          <p>Post creative memes and earn tips or sell them as NFTs.</p>
          <p>Presale Is Live</p>
          <Link to={"/GetStarted"}>
          <button className="relative mt-8 inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
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
