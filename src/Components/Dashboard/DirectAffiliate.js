import React, { useState } from "react";
import { FaNetworkWired } from "react-icons/fa";
import DropdownButton from "./Dropdown";
import { AiOutlineLineChart } from "react-icons/ai";
import Cookies from "js-cookie";
import { useEffect } from "react";
function DirectAffiliate() {
  const [searchTerm, setSearchTerm] = useState("");
  const userData = Cookies.get("user");
  var currentUser = JSON.parse(userData);
  const [directAddilliate, setDirectAddilliate] = useState([]);
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log(currentUser);
    e.preventDefault();
    // Perform search logic or API call here
    console.log("Search term:", searchTerm);
  };

  const fetchDirectAff = async () => {
    const values = {
      email: currentUser.email,
    };
    const response = await fetch(`http://localhost:5000/direct-referrals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    setDirectAddilliate(data);
    console.log(data);
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
  ];
  useEffect(() => {
    fetchDirectAff();
  }, []);
  return (
    <>
      <div className="bg-white  items-center rounded-xl p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-300 pb-4 mx-6">
          <h1 className="font-bold flex items-center p-3">
            <AiOutlineLineChart className="w-6 h-6" />
            Direct Affiliate
          </h1>
          <div className="flex flex-col gap-3 sm:flex-row items-center">
            <DropdownButton name="All Packages" />
            <form
              className="flex items-center mt-4 sm:mt-0"
              onSubmit={handleSubmit}
            >
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
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 place-items-start sm:place-items-center">
          <div className="bg-white p-4 rounded-xl flex items-center">
            <FaNetworkWired className="w-7 h-7" />
            <div className="ml-3">
              <h1 className="text-black font-semibold">Total Affiliate</h1>
              <p className="text-sm">0</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl flex items-center">
            <FaNetworkWired className="w-7 h-7" />
            <div className="ml-3">
              <h1 className="text-black font-semibold">Paid Affiliate</h1>
              <p className="text-sm">0</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl flex items-center">
            <FaNetworkWired className="w-7 h-7" />
            <div className="ml-3">
              <h1 className="text-black font-semibold">Un-Paid Affiliate</h1>
              <p className="text-sm">0</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white flex flex-col p-4 rounded-xl mt-4 overflow-x-auto">
        <table className="w-full text-sm text-left text-black dark:text-black rounded-xl overflow-hidden border border-black">
          <thead className="text-xs text-black uppercase bg-white dark:bg-white dark:text-black">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Designation
              </th>
              <th scope="col" className="px-6 py-3">
                Package
              </th>
              <th scope="col" className="px-6 py-3">
                Business
              </th>
            </tr>
          </thead>
          <tbody>
            {directAddilliate.map((user, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-white border-gray-300"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-black"
                >
                  {user.referralCode}
                </th>
                <td className="px-6 py-4">{user.fullName}</td>
                <td className="px-6 py-4">"To Be Decided"</td>
                <td className="px-6 py-4">{user.package}</td>
                <td className="px-6 py-4">"To Be Decided"</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DirectAffiliate;
