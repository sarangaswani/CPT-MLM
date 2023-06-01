import React, { useState } from "react";
import VisibilitySensor from "react-visibility-sensor";
import "./slideInAnimation.css";

const CompanyOverview = () => {
  const services = [
    {
      title: "Smart Contract Development",
      description:
        "Our team of skilled blockchain developers specializes in designing and deploying secure and efficient smart contracts tailored to your specific requirements. We leverage industry-leading platforms such as Ethereum, Polkadot, and Solana to build decentralized applications that automate processes, facilitate trustless transactions, and eliminate intermediaries.",
    },
    {
      title: "dApp Development",
      description:
        "We create decentralized applications that provide unique user experiences while leveraging the advantages of blockchain technology. Our dApps offer enhanced security, immutability, and interoperability, enabling users to engage in peer-to-peer interactions, earn rewards, and participate in decentralized governance.",
    },
    {
      title: "Consulting and Advisory",
      description:
        "We offer comprehensive consulting and advisory services to help organizations navigate the complexities of the web3 landscape. From conceptualization to implementation, we provide strategic guidance, feasibility assessments, and technical expertise to ensure successful integration of decentralized solutions into existing business models.",
    },
    {
      title: "Tokenization and Token Economy Design",
      description:
        "Our team assists clients in developing tokenized ecosystems and designing innovative token economies. We help conceptualize, launch, and manage Initial Coin Offerings (ICOs), Security Token Offerings (STOs), Non-Fungible Tokens (NFTs), and other token-based initiatives, fostering liquidity, community engagement, and value creation.",
    },
  ];

  const [isVisible, setIsVisible] = useState(false);

  const handleVisibilityChange = () => {
    setIsVisible(isVisible);
  };

  return (
    <div className="relative bg-gradient-to-br from-MiddlePurple via-customPurple to-MiddlePurple min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className=" bg-transparent rounded-lg shadow-lg p-8 sm:p-10 text-white">
        <h1 className={`text-3xl sm:text-4xl mt-16 font-bold mb-6 slide-in`}>
          Prosperchain - Driving Innovation in Web3 Technology
        </h1>
        <p className="mt-10 max-w-8xl text-lg mb-8 slide-in">
          Prosperchain is an innovative web3 project company at the forefront of
          the decentralized technology revolution. We are passionate about
          leveraging blockchain, smart contracts, and decentralized applications
          (dApps) to drive positive change across various industries. Our team
          of experts combines cutting-edge technology with a deep understanding
          of business needs to deliver impactful solutions that empower
          individuals and organizations in the decentralized ecosystem.
        </p>
        <h2 className="absolute top-[60rem] left-20  transform -translate-y-1/2 text-4xl font-bold mb-4 text-white text-center ml-10">
          Our Services
        </h2>

        <div className=" absolute right-16 top-[29rem] max-w-4xl grid  place-items-center gap-8">
          {services.map((service, index) => (
            <VisibilitySensor key={index} onChange={handleVisibilityChange}>
              {({ isVisible }) => (
                <div
                  className={`border border-gray-200 rounded p-6 ${
                    isVisible
                      ? "transition-opacity ease-out duration-500 opacity-100"
                      : "opacity-0"
                  }`}
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-base mb-4">{service.description}</p>
                </div>
              )}
            </VisibilitySensor>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyOverview;
