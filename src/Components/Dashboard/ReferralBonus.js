import React from "react";
import { FaRocket, FaBell } from "react-icons/fa";
import Cookies from "js-cookie";
import { useEffect } from "react";

export default function ReferralBonus() {
  const userData = Cookies.get("user");
  var data2 = JSON.parse(userData);

  const products = [
    {
      date: "",
      description: "",
      value: "",
      status: "",
    },
    {
      date: "",
      description: "",
      value: "",
      status: "",
    },
    {
      date: "",
      description: "",
      value: "",
      status: "",
    },

    // Add more user objects as needed
  ];

  useEffect(() => {
    console.log(data2);
  }, []);

  return (
    <>
      <div className="bg-white  items-center rounded-xl p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between mx-6">
          <h1 className="font-bold flex items-center p-3 sm:mb-0 mb-4">
            <FaRocket
              className="w-6 h-6 "
              style={{ marginRight: "8px", color: "gold" }}
            />
            Referral Bonus
          </h1>
          <div className="flex flex-col gap-2 sm:flex-row items-center sm:items-start">
            <button
              type="button"
              class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800  font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-purple-600 dark:hover:bg-purple-700 flex items"
            >
              Earning Balance: 0
            </button>
            <button
              type="button"
              class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5  flex items-center "
            >
              <FaBell className="w-4 h-4" style={{ marginRight: "3px" }} />
              Request Withdrawal
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white flex flex-col p-4 rounded-xl mt-4 overflow-x-auto">
        <table className="w-full text-sm text-left text-black dark:text-black rounded-xl overflow-hidden border border-black">
          <thead className="text-xs text-black uppercase bg-white dark:bg-white dark:text-black">
            <tr>
              <th scope="col" className="px-6 py-3">
                S.no
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Earned
              </th>
              <th scope="col" className="px-6 py-3">
                Package
              </th>
              <th scope="col" className="px-6 py-3">
                Level
              </th>
            </tr>
          </thead>
          <tbody>
            {data2.Events.map((product, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-white border-gray-300"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-black"
                >
                  {index + 1}
                </th>
                <td className="px-6 py-4">
                  {new Date(product.time).toLocaleDateString("en-GB")}
                </td>
                <td className="px-6 py-4">{product.referralCode}</td>
                <td className="px-6 py-4">{product.Earned} $</td>
                <td className="px-6 py-4">{product.package}</td>
                <td className="px-6 py-4">{product.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
