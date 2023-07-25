import React, { useState } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import Footer from "./Footer";
import Main from "./Main";
import Shop from "./Shop";
import { Link, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import DirectAffiliate from "./DirectAffiliate";
import AffiliateDownline from "./AffiliateDownline";
import Cookies from "js-cookie";
import { getGlobalState } from "../../store/global";
import MobileMenu from "./MobileMenu";
import NavButtons from "./NavButtons";
import DesktopMenu from "./DesktopMenu";
import ReferralBonus from "./ReferralBonus";
import TeamBuildingBonus from "./TeamBuildingBonus";
import RequestWithdrawal from "./RequestWithdrawal";
import RankAndReward from "./RankAndReward";
import AllRequests from "./AllRequests";
import NewRequests from "./NewRequests";

const Dashboard = ({ match }) => {
  const [updatedNavigation, setUpdatedNavigation] = useState([]);
  const token = Cookies.get("authToken");
  const userData = Cookies.get("user");
  var data2 = JSON.parse(userData);
  console.log(data2);
  // const allRef = getGlobalState("allReferralsLength");
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();
  const [Active, setActive] = useState("Dashboard");
  const navigation = [
    { name: "Dashboard", href: `/Dashboard` },
    { name: "Shop", href: `/Dashboard/Shop` },
    {
      name: "e-Bank",
      href: "#",
      subitems: [
        {
          name: "Request Withdrawal",
          href: "/Dashboard/eBank/Request-Withdrawal",
        },
      ],
    },

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
        {
          name: "Rank and Reward",
          href: "/Dashboard/My-Earnings/Rand-And-Reward",
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

    {
      name: "Requests",
      href: "#",
      subitems: [
        {
          name: "New Requests",
          href: "/Dashboard/Requests/New-Requests",
        },
        {
          name: "All Requests",
          href: "/Dashboard/Requests/All-Requests",
        },
      ],
    },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
    } else {
      const newNavigation = [...navigation];

      // Check if the email is not "wasee62313@gmail.com"
      if (data2.email !== "wasee62313@gmail.com") {
        // Find the index of the "Requests" section in the navigation array
        const requestsIndex = newNavigation.findIndex(
          (item) => item.name === "Requests"
        );

        // If the "Requests" section is found, remove it from the newNavigation array
        if (requestsIndex !== -1) {
          newNavigation.splice(requestsIndex, 1);
        }
      }

      // Update the state with the updated navigation array
      setUpdatedNavigation(newNavigation);
      // console.log(data2);
      // console.log(allRef);
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
              navigation={updatedNavigation}
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
              navigation={updatedNavigation}
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
                path="My-Earnings/Rand-And-Reward"
                element={<RankAndReward />}
              />
              <Route
                path="eBank/Request-Withdrawal"
                element={<RequestWithdrawal />}
              />
              <Route path="Requests/All-Requests" element={<AllRequests />} />
              <Route path="Requests/New-Requests" element={<NewRequests />} />
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
