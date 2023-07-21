import React from "react";

const RewardCard = ({ title, description, image }) => {
  return (
    <div className="border border-gray-300 rounded-lg shadow-md p-4">
      {/* <img src={image} alt={title} className="h-16 w-16 mx-auto mb-4" /> */}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <button
        type="button"
        className="text-black hover:text-white border border-black hover:bg-yellow-500 hover:border-none focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-black dark:text-black dark:hover:text-white dark:hover:border-none dark:hover:bg-yellow-500 "
      >
        Claim Reward
      </button>
    </div>
  );
};

export default RewardCard;
