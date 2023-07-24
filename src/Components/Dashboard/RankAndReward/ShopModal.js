import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cookies from "js-cookie";
const PortalSlider = ({ images, onClose, product }) => {
  const userData = Cookies.get("user");
  var currentUser = JSON.parse(userData);
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplaySpeed: 5000,
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [copied, setCopied] = useState(false);
  // GOOG1E6IVJNYADTEAEQW4SHDVPNEJKWTGMK4OMHNRRW6O7VAKNXGCETTCTK3Q
  // pq2uOfbqUXj2jHRDle/xnZXVhHc8KHWqJcR8xnqo
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (selectedFile) {
      // console.log(currentUser, selectedFile);
      const requestData = {
        email: currentUser.email,
        referralCode: currentUser.referralCode,
        package: currentUser.package,
        // Image: selectedFile,
      };
      console.log(JSON.stringify(requestData));
      const formData = new FormData();
      formData.append("email", currentUser.email);
      formData.append("referralCode", currentUser.referralCode);
      formData.append("package", currentUser.package);
      formData.append("Image", selectedFile);
      try {
        // for (var key of formData.entries()) {
        //   console.log(key[0] + ", " + key[1]);
        // }
        // console.log(JSON.stringify(requestData));
        const response = await fetch("http://localhost:5000/addRequest", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.message); // Log the response message from the server
          setSelectedFile(null);
          window.alert("Request added successfully!");
        } else {
          console.error("Request failed:", response.status);
          // Handle the error appropriately (e.g., show an error message to the user)
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle the error appropriately (e.g., show an error message to the user)
      }
      setSelectedFile(null);
    }
    onClose();
  };

  const handleCopyAddress = (address) => {
    navigator.clipboard.writeText(address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center">
      <div className="bg-white w-11/12 md:w-1/2 lg:w-1/3 rounded-lg p-4 pt-4">
        <div className={`${product.color} text-white p-2 rounded-md mb-5`}>
          <p className="font-semibold text-center">Payment</p>
        </div>

        <div className="w-full h-72 sm:h-96 bg-white rounded-lg overflow-hidden mx-auto">
          <Slider {...sliderSettings}>
            {images.map((item, index) => (
              <div key={index}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-56 mx-auto"
                />
                <div className="flex flex-col h-20 sm:h-24 my-4 whitespace-normal">
                  <p className="text-lg font-bold">Currency: {item.name}</p>
                  <p
                    className="text-base md:text-lg font-semibold leading-normal md:leading-tight cursor-pointer text-blue-700 overflow-hidden"
                    onClick={() => handleCopyAddress(item.address)}
                  >
                    Public Address: {item.address}
                  </p>
                  {copied && (
                    <p className="text-sm text-green-600">
                      Address copied to clipboard!
                    </p>
                  )}
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="mb-4">
          <h1 className="text-lg mb-2 font-bold">Package Details:</h1>
          <p className="font-semibold">{product.title}</p>
          <p className="font-semibold">{product.price}</p>
        </div>
        <div className="mb-6">
          <label htmlFor="fileInput" className="block text-lg font-medium">
            Select Document:
          </label>
          <input
            type="file"
            id="fileInput"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between">
          <button
            onClick={handleSubmit}
            className={`block ${product.color} text-white font-semibold px-4 py-2 rounded-md mb-2 sm:mb-0`}
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="block bg-red-600 text-white font-semibold px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortalSlider;