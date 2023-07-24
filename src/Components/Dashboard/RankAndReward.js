import React, { useState } from "react";
import RankCard from "./RankAndReward/RankCard";
import RewardCard from "./RankAndReward/RewardCard";
import { FaAward, FaTrophy } from "react-icons/fa";
import Cookies from "js-cookie";
function RankAndReward() {
  const userData = Cookies.get("user");
  var currentUser = JSON.parse(userData);
  // console.log(currentUser);
  const [selectedOption, setSelectedOption] = useState(null);
  const [ethAddress, setEthAddress] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [ethAddressError, setEthAddressError] = useState("");
  // console.log(currentUser.rewards.choice1);

  const isValidEthereumAddress = (address) => {
    // Ethereum addresses are hexadecimal strings with a length of 42 (including "0x" prefix).
    const ethereumAddressRegex = /^0x[0-9a-fA-F]{40}$/;
    return ethereumAddressRegex.test(address);
  };

  const handleRewardSelection = (option) => {
    setSelectedOption(option);
  };

  const handleClaimReward = async () => {
    if (selectedOption === "choice1") {
      if (!isValidEthereumAddress(ethAddress)) {
        setEthAddressError("Invalid Ethereum address");
        return;
      } else {
        setEthAddressError("");
      }
    }

    const values = {
      WalletAddress: ethAddress,
      HomeAddress: homeAddress,
      PhoneNumber: mobileNumber,
      email: currentUser.email,
      referralCode: currentUser.referralCode,
      choice: selectedOption,
      rank: currentUser.rank,
    };

    console.log(values);
    const response = await fetch("http://localhost:5000/claimRankandReward", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message); // Log the response message from the server
      setSelectedOption(null);
      window.alert("Reward Claimed successfully!");
    } else {
      console.log("Error");
    }
  };
  const rewardsAvailable =
    currentUser.rank && currentUser.rewards.choice1 !== "Null";

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
              Total Business: $ {currentUser.totalBusiness}
            </button>
            <button
              type="button"
              class="focus:outline-none text-white bg-yellow-500   font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-yellow-500  flex items"
            >
              Rank: {currentUser.rank}
            </button>
          </div>
        </div>
      </div>

      {currentUser.rewards.choice1 !== "Null" ? (
        <div className="bg-white flex flex-col p-10 rounded-xl mt-4 overflow-x-auto">
          <h1 className="flex text-3xl font-semibold mb-8 justify-center">
            <div className="text-yellow-500 text-3xl flex justify-center items-center mr-3">
              <FaTrophy />
            </div>
            Congratulations on acquiring {currentUser.rank} Rank
            <div className="text-yellow-500 text-3xl flex justify-center items-center ml-3">
              <FaTrophy />
            </div>
          </h1>

          {/* Render Rank Cards */}

          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-8 ">
            <RankCard rank="1" title="Choose your reward" />
          </div>

          {/* Render Reward Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="border border-gray-300 rounded-lg shadow-md p-4 cursor-pointer">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    $ {currentUser.rewards.choice1}
                  </h3>
                  <p className="text-gray-600">
                    Get ${currentUser.rewards.choice1} worth TCP tokens that
                    will be claimable in one week
                  </p>
                </div>
                <input
                  type="radio"
                  name="rewardOption"
                  checked={selectedOption === "choice1"}
                  onChange={() => handleRewardSelection("choice1")}
                />
              </div>
              {selectedOption === "choice1" && (
                <div className="mt-4">
                  <label className="block mb-2 font-semibold">
                    Ethereum Address:
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    value={ethAddress}
                    onChange={(e) => setEthAddress(e.target.value)}
                  />
                  {ethAddressError && (
                    <p className="text-red-600">{ethAddressError}</p>
                  )}
                </div>
              )}
            </label>

            <label className="border border-gray-300 rounded-lg shadow-md p-4 cursor-pointer">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {currentUser.rewards.choice2}
                  </h3>
                  <p className="text-gray-600 ">
                    Get ${currentUser.rewards.choice1} worth{" "}
                    {currentUser.rewards.choice2}, that will be delivere in 2
                    weeks
                  </p>
                </div>
                <input
                  type="radio"
                  name="rewardOption"
                  checked={selectedOption === "choice2"}
                  onChange={() => handleRewardSelection("choice2")}
                />
              </div>
              {selectedOption === "choice2" && (
                <div className="mt-4">
                  <label className="block mb-2 font-semibold">
                    Home Address:
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    value={homeAddress}
                    onChange={(e) => setHomeAddress(e.target.value)}
                  />
                  <label className="block mt-4 mb-2 font-semibold">
                    Mobile Number:
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                </div>
              )}
            </label>
          </div>
          <button
            type="button"
            class="focus:outline-none text-white bg-yellow-500 hover:bg-yellow-400 font-medium rounded-lg text-sm px-5 py-2.5 mt-6"
            onClick={handleClaimReward}
          >
            CLaim Reward
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-8 ">
            {currentUser.rank === "Null" ? (
              <RankCard
                rank="1"
                title="You have not achived any rank to get rewards "
              />
            ) : (
              <>
                <RankCard
                  rank="1"
                  title="You have already claimed your reward"
                />
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default RankAndReward;
