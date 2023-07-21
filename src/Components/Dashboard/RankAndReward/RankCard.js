import React from 'react';

const RankCard = ({ rank, title, description }) => {
  return (
    <div className="border border-gray-300 rounded-lg shadow-md p-4">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {/* <div className="bg-blue-500 text-white p-2 rounded-md">{`Rank: ${rank}`}</div> */}
    </div>
  );
};

export default RankCard;
