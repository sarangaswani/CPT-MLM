import React from "react";
import { FaWallet } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  MdAccountBalance,
  MdCardGiftcard,
  MdAttachMoney,
} from "react-icons/md";
import { FiSend } from "react-icons/fi";

function Main() {
  const content = [
    {
      name: "Direct Affiliate",
      decs: "On my 1st Level",
      label: "Total",
      members: "0 Members",
      imageUrl: <FiSend size={24} color="black" style={{ fill: "black" }} />,
    },
    {
      name: "Affiliate Network",
      decs: "My Team Network",
      label: "Team Count",
      members: "0 Members",
      imageUrl: <FontAwesomeIcon icon={faPaperPlane} size="xl" />,
    },
    {
      name: "My Account",
      decs: "eBank Funds",
      label: "Total earning",
      members: "0.00",
      imageUrl: <MdAttachMoney size={24} color="black" />,
    },
    // Add more user objects as needed
  ];
  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
      <div
    className="bg-indigo-300 p-4 w-full sm:w-1/3 flex flex-col items-center justify-center rounded-xl"
    style={{
      backgroundImage: "url('background-1409025_1280.png')",
    }}
  >
    <h1 className="text-white text-xl font-bold p-4 text-left">
      Choose from multiple Mether World packages
    </h1>
    <button
      type="button"
      className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 self-start ml-3"
    >
      Buy now 
    </button>
  </div>

        <div className="bg-white p-4 w-full sm:w-2/3 rounded-xl ">
          <div>
            <h1 className="font-bold text-xl">My Stats</h1>
            <p className="text-xs ">
              More than 100+ new members joins Mether World every Hour
            </p>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <tbody>
                {content.map((user, index) => (
                  <tr key={index} className="bg-transparent  text-black">
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
                    >
                      {user.imageUrl}
                      <div className="pl-3">
                        <div className="text-base font-semibold">
                          {user.name}
                        </div>
                        <div className="font-normal text-gray-500">
                          {user.decs}
                        </div>
                      </div>
                    </th>
                    <td className="px-6 py-4">{user.position}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">{user.label}</div>
                    </td>
                    <td className="px-6 py-4">{user.members}</td>
                    <td className="px-6 py-4">
                      <button className="flex items-center justify-center px-4 py-2 bg-transparent hover:bg-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          color="#000000"
                          size="md"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 h-32">
        <div className="bg-blue-300 p-4 rounded-xl flex items-center pl-16">
          <FaWallet size={32} style={{ color: "black" }} />
          <div>
            <h1 className="text-black font-semibold ml-3">e Bank</h1>
            <p className="ml-3 text-sm">Total: 0</p>
          </div>
        </div>
        <div className="bg-green-300 p-4 rounded-xl flex items-center pl-16">
          <MdAccountBalance size={32} />
          <div>
            <h1 className="text-black font-semibold ml-3">mCash Wallet</h1>
            <p className="ml-3 text-sm">Balance: 0.55</p>
          </div>
        </div>
        <div className="bg-yellow-300 p-4 rounded-xl flex items-center pl-16">
          <MdCardGiftcard size={32} />
          <div>
            <h1 className="text-black font-semibold ml-3">My Package</h1>
            <p className="ml-3 text-sm">Starter</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
