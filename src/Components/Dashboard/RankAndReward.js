import React, { useState } from "react";
import RankCard from "./RankAndReward/RankCard";
import RewardCard from "./RankAndReward/RewardCard";
import { FaAward, FaTrophy } from "react-icons/fa";
function RankAndReward() {
  const rewardsData = [
    {
      title: "Reward 1",
      description: "Description of Reward 1",
      image: "path/to/reward1-image.png",
    },
    {
      title: "Reward 2",
      description: "Description of Reward 2",
      image: "path/to/reward2-image.png",
    },
    {
      title: "Reward 3",
      description: "Description of Reward 3",
      image: "path/to/reward2-image.png",
    },
    // Add more reward objects as needed
  ];
  const [selectedOption, setSelectedOption] = useState(null);

  const handleRewardSelection = (option) => {
    setSelectedOption(option);
  };

  return (
    <>
      <div className="bg-white  items-center rounded-xl p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between mx-6">
          <h1 className="font-bold flex items-center p-3 sm:mb-0 mb-4 text-xl">
            <div className="flex-row">
              <FaAward className="text-yellow-500 text-3xl" />
            </div>
            Rank and Rewards
          </h1>
          <div className="flex flex-col gap-2 sm:flex-row items-center sm:items-start">
            <button
              type="button"
              class="focus:outline-none text-white bg-yellow-500   font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-yellow-500  flex items"
            >
              Total Business: 0
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white flex flex-col p-10 rounded-xl mt-4 overflow-x-auto">
        <h1 className="flex text-3xl font-semibold mb-8 justify-center">
          <div className="text-yellow-500 text-3xl flex justify-center items-center mr-3">
            <FaTrophy />
          </div>
          Congratulations on acquiring Gold Rank
          <div className="text-yellow-500 text-3xl flex justify-center items-center ml-3">
            <FaTrophy />
          </div>
        </h1>

        {/* Render Rank Cards */}

        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-8 ">
          <RankCard
            rank="1"
            title="Gold Rank"
            description="Achieve the Gold rank and get exclusive rewards."
          />
        </div>

        {/* Render Reward Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="border border-gray-300 rounded-lg shadow-md p-4 cursor-pointer">
          <div className="flex justify-between">
            <div>
            <h3 className="text-xl font-semibold mb-2">Reward 1</h3>
            <p className="text-gray-600">Description of Reward 1</p>
            </div>
            <input
              type="radio"
              name="rewardOption"
              checked={selectedOption === "option1"}
              onChange={() => handleRewardSelection("option1")}
            />
            </div>
          </label>

          <label className="border border-gray-300 rounded-lg shadow-md p-4 cursor-pointer">
          <div className="flex justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">Reward 2</h3>
            <p className="text-gray-600 ">Description of Reward 2</p>
            </div>
            <input
              type="radio"
              name="rewardOption"
              checked={selectedOption === "option2"}
              onChange={() => handleRewardSelection("option2")}
            />
            </div>
          </label>
        </div>
        <button
          type="button"
          class="focus:outline-none text-white bg-yellow-500 hover:bg-yellow-400 font-medium rounded-lg text-sm px-5 py-2.5 mt-6"
        >
          CLaim Reward
        </button>
      </div>
    </>
  );
}

export default RankAndReward;
