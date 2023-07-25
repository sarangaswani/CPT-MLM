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
} from "@fortawesome/free-solid-svg-icons"; // Import the required icons
import { useState } from "react";
import { useEffect } from "react";
import { get } from "mongoose";

function NewRequests() {
  const userData = Cookies.get("user");
  var data2 = JSON.parse(userData);

  const values = {
    email: data2.email,
  };
  const [NewRequests, setNewRequests] = useState([]);

  const getNewRequests = async () => {
    const response = await fetch(`http://localhost:5000/getNewRequests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    setNewRequests(data.requests);
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
  const handleDecision = async (email, decision) => {
    const values = { email, decision };
    const response = await fetch(`http://localhost:5000/invest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    console.log(data, response);
  };

  useEffect(() => {
    getNewRequests();
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
            New Requests
          </h1>
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
                Download
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {NewRequests.map((item, index) => (
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
                  <span className="text-sm text-gray-900">${item.amount}</span>
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
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    className="px-2 py-1 rounded bg-green-500 text-white hover:bg-green-600"
                    onClick={() => {
                      handleDecision(item.email, "Accepted");
                    }}
                  >
                    <FontAwesomeIcon icon={faCheck} className="w-4 h-4" />
                  </button>
                  <button
                    className="px-2 py-1 ml-2 rounded bg-red-500 text-white hover:bg-red-600"
                    onClick={() => {
                      handleDecision(item.email, "Rejected");
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default NewRequests;
