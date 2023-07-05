import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const ProductCard = ({ product }) => {
  const decsLines = product.decs.split("\n");

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
          <span className="text-3xl font-bold text-black">
            {product.price}
          </span>
          <a
            href="/"
            className={`text-white ${product.color} hover:bg-${product.color}-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
          >
            Buy Now
          </a>
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
      decs: `1000 Seo Points
600 ePoints
Marketing Hosting Account
Full Access to Online Training
Virtual Office Access
Affiliate Programme benefits
2 Year access to Member`,
      price: "$270",
      color: "bg-green-500",
    },
    {
      image: (
        <FontAwesomeIcon icon={faStar} className="w-10 h-10 text-red-500" />
      ),
      title: "Platinum Package",
      rating: 5,
      decs: `2000 Seo Points
      1000 ePoints
      Marketing Hosting Account
      Full Access to Online Training 
      Virtual Office Access
      Affiliate Programme benefits
      2 Year access to Member`,
      price: "$450",
      color: "bg-red-500",
    },
    {
      image: (
        <FontAwesomeIcon icon={faStar} className="w-10 h-10 text-yellow-400" />
      ),
      title: "Exclusive Package",
      rating: 5,
      decs: `5000 Seo Points
      2500 ePoints
      Marketing Hosting Account
      Full Access to Online Training 
      Virtual Office Access
      Affiliate Programme benefits
      2 Year access to Member`,
      price: "$900",
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9 py-4 place-items-center">
    {products.map((product, index) => (
      <ProductCard key={index} product={product} />
    ))}
  </div>
  );
};

export default ProductList;
