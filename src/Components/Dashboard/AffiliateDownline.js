import React, { useState } from "react";
import { FaNetworkWired, FaUsers } from "react-icons/fa";
import DropdownButton from "./Dropdown";
import { AiOutlineLineChart } from "react-icons/ai";
import Cookies from "js-cookie";
import { useEffect } from "react";

function AffiliateDownline() {
  const [searchTerm, setSearchTerm] = useState("");
  const userData = Cookies.get("user");
  const [allReferrals, setallReferrals] = useState([]);
  const [paid, setPaid] = useState();
  const [unPaid, setUnPaid] = useState();
  var currentUser = JSON.parse(userData);
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform search logic or API call here
    console.log("Search term:", searchTerm);
  };
  const fetchDirectAff = async () => {
    const values = {
      email: currentUser.email,
    };
    const response = await fetch(`http://localhost:5000/all-referrals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    setallReferrals(data.allReferralObjects);
    setPaid(data.nonNullPackageCount);
    setUnPaid(data.nullPackageCount);
    console.log(data);
  };

  useEffect(() => {
    fetchDirectAff();
  }, []);

  const products = [
    {
      username: "Affiliate Downline",
      name: "",
      referral: "",
      downlinelevel: "",
      business: "",
      package: "",
      registrationdate: "",
    },
    {
      username: "Affiliate Downline",
      name: "",
      referral: "",
      downlinelevel: "",
      business: "",
      package: "",
      registrationdate: "",
    },
    // Add more user objects as needed
  ];

  return (
    <>
      <div className="bg-white rounded-xl p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-300 pb-4 mx-6">
          <h1 className="font-bold flex">
            <FaUsers size={24} style={{ marginRight: "8px" }} />
            Affiliate Downline
          </h1>
          <div className="flex flex-col gap-4 sm:flex-row items-center mt-4 sm:mt-0">
            <DropdownButton name="All Level" />
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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 place-items-start sm:place-items-center">
          <div className="bg-white p-4 rounded-xl flex items-center">
            <FaUsers size={24} color="gray" />
            <div className="ml-3">
              <h1 className="text-black font-semibold">Total Downline</h1>
              <p className="text-sm">{allReferrals.length}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl flex items-center">
            <FaUsers size={24} color="green" />
            <div className="ml-3">
              <h1 className="text-black font-semibold">Paid Downline</h1>
              <p className="text-sm">{paid}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl flex items-center">
            <FaUsers size={24} color="red" />
            <div className="ml-3">
              <h1 className="text-black font-semibold">Un-Paid Downline</h1>
              <p className="text-sm">{unPaid}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white flex flex-col p-4 rounded-xl mt-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-black dark:text-black border border-gray-300 rounded-xl">
            <thead className="text-xs text-black uppercase bg-white dark:bg-white dark:text-black">
              <tr>
                <th scope="col" className="px-4 py-3 sm:px-6 sm:py-3">
                  ID
                </th>
                <th scope="col" className="px-4 py-3 sm:px-6 sm:py-3">
                  Name
                </th>

                <th scope="col" className="px-4 py-3 sm:px-6 sm:py-3">
                  Downline Level
                </th>
                <th scope="col" className="px-4 py-3 sm:px-6 sm:py-3">
                  Package
                </th>
                <th scope="col" className="px-4 py-3 sm:px-6 sm:py-3">
                  Registration Date
                </th>
              </tr>
            </thead>
            <tbody>
              {allReferrals.map((product, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-white border-gray-300"
                >
                  <th
                    scope="row"
                    className="px-4 py-4 sm:px-6 sm:py-4 font-medium text-black whitespace-nowrap dark:text-black"
                  >
                    {product.referralCode}
                  </th>
                  <td className="px-4 py-4 sm:px-6 sm:py-4">
                    {product.fullName}
                  </td>

                  <td className="px-4 py-4 sm:px-6 sm:py-4">{product.level}</td>
                  <td className="px-4 py-4 sm:px-6 sm:py-4">
                    {product.package}
                  </td>
                  <td className="px-4 py-4 sm:px-6 sm:py-4">"TO BE ADDED"</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AffiliateDownline;
