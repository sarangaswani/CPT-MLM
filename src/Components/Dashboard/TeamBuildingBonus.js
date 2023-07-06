import React from 'react'
import {  FaStar, FaUser,FaBell  } from "react-icons/fa";


export default function TeamBuildingBonus() {
    const products = [
        {
          date: "",
          description: "",
          totalbonus: "",
          breakdown: "",
          status: "",
        },
        
    
    
        // Add more user objects as needed
      ];
      
  return (
    <>
      <div className="bg-white  items-center rounded-xl p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between mx-6">
          <h1 className="font-bold flex items-center p-3 sm:mb-0 mb-4 text-xl">
          <div className="flex-row">
            <FaUser
              className="w-6 h-6 "
              style={{ marginRight: '12px', color: 'red' }}
            />
            <div className="flex">
            <FaStar className="w-2 h-2" style={{ marginRight: '1px', marginTop: "2px",color: 'red' }} />
            <FaStar className="w-2 h-2" style={{ marginRight: '1px', marginTop: "2px",color: 'red' }} />
            <FaStar className="w-2 h-2" style={{ marginRight: '1px', marginTop: "2px",color: 'red' }} />
            </div>
            </div>
            Team Building Bonus
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
              class="focus:outline-none text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5  flex items-center "
            >
            <FaBell className="w-4 h-4" style={{ marginRight: '3px'}} />
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
              Description
              </th>
              <th scope="col" className="px-6 py-3">
              Total Bonus	
              </th>
              <th scope="col" className="px-6 py-3">
              Breakdown	
              </th>
              <th scope="col" className="px-6 py-3">
              Status
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
                  {index+1}
                </th>
                <td className="px-6 py-4">{product.date}</td>
                <td className="px-6 py-4">{product.description}</td>
                <td className="px-6 py-4">{product.totalbonus}</td>
                <td className="px-6 py-4">{product.breakdown}</td>
                <td className="px-6 py-4">{product.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
