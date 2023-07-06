import React, { useState } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import Footer from "./Footer";
import Main from "./Main";
import Shop from "./Shop";
import { Link, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Session from "react-session-api"; // Import Session
import Cookies from "js-cookie";
import DirectAffiliate from "./DirectAffiliate";
import AffiliateDownline from "./AffiliateDownline";
import MobileMenu from "./MobileMenu";
import NavButtons from "./NavButtons";
import DesktopMenu from "./DesktopMenu";
import ReferralBonus from "./ReferralBonus";
import TeamBuildingBonus from "./TeamBuildingBonus";
import RequestWithdrawal from "./RequestWithdrawal";

const Dashboard = ({ match }) => {
  const token = Cookies.get("authToken");
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();
  const [Active, setActive] = useState("Dashboard");
  const navigation = [
    { name: "Dashboard", href: `/Dashboard` },
    { name: "Shop", href: `/Dashboard/Shop` },
    { name: "e-Bank", href: "#",
    subitems: [
      {
        name: "Request Withdrawal",
        href: "/Dashboard/eBank/Request-Withdrawal",
      },
      
    ], },
    { name: "mCash", href: "#" },
    { name: "MUSD", href: "#" },
    {
      name: "My Earnings",
      href: "#",
      subitems: [
        {
          name: "Referral Bonus",
          href: "/Dashboard/My-Earnings/Referral-Bonus",
        },
        {
          name: "Team Building Bonus",
          href: "/Dashboard/My-Earnings/Team-Building-Bonus",
        },
      ],
    },
    {
      name: "Affiliate Network",
      href: "#",
      subitems: [
        {
          name: "Direct Affiliate",
          href: "/Dashboard/Affiliate-Network/Direct-Affiliate",
        },
        {
          name: "Affiliate Downline",
          href: "/Dashboard/Affiliate-Network/Affiliate-Downline",
        },
      ],
    },
    { name: "Notifications", href: "#" },
    { name: "Support", href: "#" },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
    } else {
      console.log(token);
    }
  }, [token]);


  return (
    <div className="bg-gradient-to-br from-MiddlePurple via-customPurple to-MiddlePurple min-h-screen">
      <Disclosure as="nav" className="bg-transparent pt-3">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <NavButtons
                classNames={classNames}
                navigate={navigate}
                open={open}
              />
            </div>

            <MobileMenu
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              navigation={navigation}
              Active={Active}
              setActive={setActive}
              classNames={classNames}
            />
          </>
        )}
      </Disclosure>
      <Disclosure as="nav" className="bg-tansparent">
        {({ open }) => (
          <>
            <DesktopMenu
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              navigation={navigation}
              Active={Active}
              setActive={setActive}
              classNames={classNames}
            />
          </>
        )}
      </Disclosure>
      <main>
        <div className="bg-purple-200 rounded-lg mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="Shop" element={<Shop />} />
              <Route
                path="Affiliate-Network/Direct-Affiliate"
                element={<DirectAffiliate />}
              />
              <Route
                path="Affiliate-Network/Affiliate-Downline"
                element={<AffiliateDownline />}
              />
              <Route
                path="My-Earnings/Referral-Bonus"
                element={<ReferralBonus />}
              />
              <Route
                path="My-Earnings/Team-Building-Bonus"
                element={<TeamBuildingBonus />}
              />
              <Route
                path="eBank/Request-Withdrawal"
                element={<RequestWithdrawal />}
              />
              {/* Add more Route components for each navigation item */}
            </Routes>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
