import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PortalSlider = ({ images, onClose, product }) => {
  // Slick Slider settings
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    // You can handle the form submission here
    if (selectedFile) {
      console.log("Selected File:", selectedFile);
      // Reset the file input
      setSelectedFile(null);
    }
    onClose(); // Close the modal after submitting
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center ">
      <div className=" bg-white w-1/2 rounded-lg p-4 pt-4">
        <div className={`${product.color} text-white p-2 rounded-md mb-5`}>
        <p className="font-semibold text-center">Payment</p>
        </div>

        <div className="w-full bg-white rounded-lg overflow-hidden mx-auto">
          <Slider {...sliderSettings}>
            {images.map((item, index) => (
              <div key={index}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-56 mx-auto"
                />
                <div className="flex flex-col my-10">
                  <p className="text-xl font-bold">Currency: {item.name}</p>
                  <p className="text-xl font-semibold">
                    Public Address: {item.address}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="mb-7 ">
          <h1 className="text-xl mb-2 font-bold">Package Details:</h1>
          <p className="font-semibold">{product.title} </p>
          <p className="font-semibold">{product.price} </p>
        </div>
        <div className="mb-9 ">
          <label htmlFor="fileInput" className="block text-lg font-medium">
            Select Document:
          </label>
          <input
            type="file"
            id="fileInput"
            className="mt-1 block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleSubmit}
            className={`block ${product.color} text-white font-semibold px-4 py-2 rounded-md`}
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
