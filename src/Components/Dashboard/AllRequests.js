import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FaBell } from "react-icons/fa";
import Cookies from "js-cookie";
import {
  faCheck,
  faTimes,
  faEnvelope,
  faDownload,
  faUser,
} from "@fortawesome/free-solid-svg-icons"; // Import the required icons
import { useState } from "react";
import { useEffect } from "react";

function AllRequests() {
  const userData = Cookies.get("user");
  var data2 = JSON.parse(userData);
  const values = {
    email: data2.email,
  };
  const [allRequests, setAllRequests] = useState([]);

  const fetchAllRequests = async () => {
    const response = await fetch(`http://localhost:5000/getAllRequests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    setAllRequests(data.requests);
    console.log(data.requests);
  };

  const handleDownload = (imageUrl) => {
    // Create an anchor element
    const downloadLink = document.createElement("a");
    downloadLink.href = imageUrl;
    downloadLink.download = "downloaded-image.png"; // Change the file name if needed

    // Trigger the download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const requests = [
    {
      email: "example@example.com",
      referal: "1234",
      package: "Standard",
      status: "Accepted",
    },
    {
      email: "wasee@example.com",
      referal: "4231",
      package: "Exclusive",
      status: "Rejected",
    },
  ];
  useEffect(() => {
    fetchAllRequests();
  }, []);
  return (
    <>
      <div className="bg-white  items-center rounded-xl p-4 mb-4">
        <div className="flex flex-col sm:flex-row items-center ">
          <h1 className="font-bold   flex items-center p-3 sm:mb-0 mb-4">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="w-7 h-7 text-green-500 mr-2"
            />
            All Requests
          </h1>

          <form className="w-1/2 ml-auto">
            {/* <label
              htmlFor="default-search"
              className="text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label> */}
            {/* <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FontAwesomeIcon
                  icon={faUser}
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                />
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-3.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black "
                placeholder="Search using email"
                required
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-1.5 bg-green-500 hover:bg-green-500 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-500 dark:hover:bg-green-600 "
              >
                Search
              </button>
            </div> */}
          </form>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email Address
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Referral Code
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Package
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Amount
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Proof
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allRequests.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{item.email}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">
                    {item.referralCode}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{item.package}</span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">$ {item.amount}</span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="ml-5 px-2 py-1 rounded bg-green-500 text-white hover:bg-green-600"
                    onClick={() => {
                      handleDownload(item.Image);
                    }}
                  >
                    <FontAwesomeIcon icon={faDownload} className="w-4 h-4" />
                  </button>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {item.Decision === "Accepted" && (
                    <span className="px-2 py-1 rounded text-green-600 border border-green-600">
                      {item.Decision}
                    </span>
                  )}
                  {item.Decision === "Rejected" && (
                    <span className="px-2 py-1 rounded text-red-600 border border-red-500">
                      {item.Decision}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AllRequests;
