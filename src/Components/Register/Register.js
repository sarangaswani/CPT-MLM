import React, { useState } from "react";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  return (
    <div className="relative registration-form bg-gradient-to-br from-MiddlePurple via-customPurple to-MiddlePurple flex justify-center items-center min-h-screen">
      <div className="absolute top-1/2 left-20  transform -translate-y-1/2 text-4xl font-bold mb-4 text-white text-center ml-10 animate-bounce">
          <h2>Get Yourself</h2>
      </div>
      <div className="absolute top-1/2 right-32  transform -translate-y-1/2 text-4xl font-bold mb-4 text-white text-center ml-10 animate-bounce">
          <h2>Registered</h2>
      </div>
      <div className="form-container p-6  bg-gradient-to-br from-customPurple via-MiddlePurple to-customPurple rounded-lg shadow-2xl w-full max-w-lg">
        <h1 className="text-2xl mb-4 font-bold text-white">
          Registration Form
        </h1>
        <form onSubmit={handleSubmit} className="text-white">
          <div className="mb-4">
            <label htmlFor="firstName" className="block mb-2 font-medium">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block mb-2 font-medium">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="relative mt-8 inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Register
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
