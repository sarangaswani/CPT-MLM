import React, { useState } from "react";
import { FaNetworkWired } from 'react-icons/fa';
import DropdownButton from "./Dropdown";
import { AiOutlineLineChart } from 'react-icons/ai';

function DirectAffiliate() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform search logic or API call here
    console.log("Search term:", searchTerm);
  };
  const products = [
    {
      username: "Direct Affiliate",
      name: "",
      rank: "",
      package: "",
      business: "",
    },
    {
      username: "Direct Affiliate",
      name: "",
      rank: "",
      package: "",
      business: "",
    },
    {
      username: "Direct Affiliate",
      name: "",
      rank: "",
      package: "",
      business: "",
    },

    // Add more user objects as needed
  ];
  return (
    <>
      <div className="bg-white  items-center justify-center rounded-xl p-4">
        <div className="flex items-center justify-around w-full border-b border-gray-300 pb-4">
          <h1 className="font-bold flex"> <AiOutlineLineChart className="w-6 h-6" />Direct Affiliate</h1>
          <DropdownButton />
          <form className="flex items-center" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="px-4 py-2 ml-2 text-white bg-purple-950 rounded-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Search
            </button>
          </form>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 h-32">
          <div className="bg-white p-4 rounded-xl flex items-center pl-16">
          <FaNetworkWired className="w-7 h-7" />
            <div>
              <h1 className="text-black font-semibold ml-3">Total Affiliate</h1>
              <p className="ml-3 text-sm">0</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl flex items-center pl-16">
          <FaNetworkWired className="w-7 h-7" />
            <div>
              <h1 className="text-black font-semibold ml-3">Paid Affiliate</h1>
              <p className="ml-3 text-sm">0</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl flex items-center pl-16">
          <FaNetworkWired className="w-7 h-7" />
            <div>
              <h1 className="text-black font-semibold ml-3">Un-Paid Affiliate</h1>
              <p className="ml-3 text-sm">0</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white flex flex-col p-4 rounded-xl mt-4">
        <table className="w-full text-sm text-left text-black dark:text-black rounded-xl overflow-hidden border border-black">
          <thead className="text-xs text-black uppercase bg-white dark:bg-white dark:text-black">
            <tr>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Designation
              </th>
              <th scope="col" className="px-6 py-3">
                Highest Downline Rank
              </th>
              <th scope="col" className="px-6 py-3">
                Package
              </th>
              <th scope="col" className="px-6 py-3">
                Business
              </th>
              <th scope="col" className="px-6 py-3">
                Activation
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-white border-gray-300"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-black"
                >
                  {product.username}
                </th>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.designation}</td>
                <td className="px-6 py-4">{product.rank}</td>
                <td className="px-6 py-4">{product.package}</td>
                <td className="px-6 py-4">{product.business}</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DirectAffiliate;
