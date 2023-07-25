import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import ShopModal from "./RankAndReward/ShopModal";
import ReactDOM from "react-dom";
import ETHImage from "../../assets/ETH.jpg";
import TRX from "../../assets/TRX.jpg";
import USDT1 from "../../assets/USDT.jpg";
import USDT2 from "../../assets/USDT2.jpg";
import { createPortal } from "react-dom";

const ProductCard = ({ product, setisOpen, setcurrProd }) => {
  const decsLines = product.decs.split("\n");

  const handleBuyNow = async (product) => {
    console.log(product);
    // ----------------------------- ADD PAYMENT METHOD FIRST ----------------------------- //
    // const userData = Cookies.get("user");
    // var currentUser = JSON.parse(userData);
    // const values = {
    //   userId: currentUser.email,
    //   amount: 1000,
    //   package: "Premium",
    // };
    // const response = await fetch(`http://localhost:5000/invest`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(values),
    // });
    // const data = await response.json();
    // console.log(data, response);
    setisOpen(true);
    setcurrProd(product);
  };

  return (
    <div className="w-11/12 max-w-md sm:max-w-md bg-white rounded-2xl shadow-2xl">
      <div className="flex items-center justify-center p-20">
        {product.image}
      </div>
      <div className="px-5 pb-5">
        <a href="/">
          <h5 className="text-3xl font-bold tracking-tight text-black text-center">
            {product.title}
          </h5>
        </a>
        <div className="items-center my-9  text-black text-center">
          {decsLines.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-black">{product.price}</span>
          <button
            onClick={(e) => {
              handleBuyNow(product);
            }}
            className={`text-white ${product.color} hover:bg-${product.color}-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductList = () => {
  const products = [
    {
      image: (
        <FontAwesomeIcon icon={faStar} className="w-10 h-10 text-green-400" />
      ),
      title: "Standard Package",
      rating: 5,
      decs: `225% of TCP`,
      price: "$50",
      color: "bg-green-500",
      dollar: 50,
    },
    {
      image: (
        <FontAwesomeIcon icon={faStar} className="w-10 h-10 text-red-500" />
      ),
      title: "Platinum Package",
      rating: 5,
      decs: `235% of TCP`,
      price: "$100",
      color: "bg-red-500",
      dollar: 100,
    },
    {
      image: (
        <FontAwesomeIcon icon={faStar} className="w-10 h-10 text-yellow-400" />
      ),
      title: "Exclusive Package",
      rating: 5,
      decs: `245% of TCP`,
      price: "$250",
      color: "bg-yellow-500",
      dollar: 250,
    },
    {
      image: (
        <FontAwesomeIcon icon={faStar} className="w-10 h-10 text-orange-500" />
      ),
      title: "Exclusive Package",
      rating: 5,
      decs: `265% of TCP`,
      price: "$500",
      color: "bg-orange-500",
      dollar: 500,
    },
    {
      image: (
        <FontAwesomeIcon icon={faStar} className="w-10 h-10 text-blue-400" />
      ),
      title: "Exclusive Package",
      rating: 5,
      decs: `270% of TCP`,
      price: "$1.000",
      color: "bg-blue-500",
      dollar: 1000,
    },
    {
      image: (
        <FontAwesomeIcon icon={faStar} className="w-10 h-10 text-purple-400" />
      ),
      title: "Exclusive Package",
      rating: 5,
      decs: `275% of TCP`,
      price: "$5,000",
      color: "bg-purple-500",
      dollar: 5000,
    },
    {
      image: (
        <FontAwesomeIcon icon={faStar} className="w-10 h-10 text-black-400" />
      ),
      title: "Exclusive Package",
      rating: 5,
      decs: `285% of TCP`,
      price: "$10,000",
      color: "bg-yellow-500",
      dollar: 10000,
    },
  ];
  const images = [
    {
      index: 1,
      image: USDT1,
      name: "USDT",
      address: "0x1F3A22F6E79504995F00C9c874cf6C9070599526",
    },
    {
      index: 2,
      image: ETHImage,
      name: "ETH",
      address: "0x76a19B22A3154F6f1FE2066CbC1Bdfc16888DB08",
    },
    {
      index: 3,
      image: TRX,
      name: "TRX",
      address: "TU2Ezd2NJkWCSyGLHGkYq9HWEpSht3bNsU",
    },

    {
      index: 4,
      image: USDT2,
      name: "USDT",
      address: "TU2Ezd2NJkWCSyGLHGkYq9HWEpSht3bNsU",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currProd, setcurrProd] = useState(null);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const portalRoot = document.getElementById("portal-root");
  const portalContainer = document.createElement("div");

  React.useEffect(() => {
    portalRoot.appendChild(portalContainer);

    // Cleanup function to remove the portal container when the component is unmounted
    return () => {
      portalRoot.removeChild(portalContainer);
    };
  }, [portalRoot, portalContainer]);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9 py-4 place-items-center">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            setisOpen={setIsModalOpen}
            setcurrProd={setcurrProd}
          />
        ))}
      </div>
      {/* <ShopModal/> */}
      {isModalOpen &&
        createPortal(
          <ShopModal
            images={images}
            onClose={handleCloseModal}
            product={currProd}
          />,
          portalContainer
        )}
    </>
  );
};

export default ProductList;
