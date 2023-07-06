import React, { useState } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
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

const Dashboard = ({ match }) => {
  const token = Cookies.get("authToken");
  const userData = Cookies.get("user");
  var data2 = JSON.parse(userData);
  const allRef = getGlobalState("allReferralsLength");
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();
  const [Active, setActive] = useState("Dashboard");
  const navigation = [
    { name: "Dashboard", href: `/Dashboard` },
    { name: "Shop", href: `/Dashboard/Shop` },
    { name: "e-Bank", href: "#" },
    { name: "mCash", href: "#" },
    { name: "MUSD", href: "#" },
    { name: "My Earnings", href: "#" },
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
      // console.log(data2);
      console.log(allRef);
    }
  }, [token]);
  return (
    <div className="bg-gradient-to-br from-MiddlePurple via-customPurple to-MiddlePurple min-h-screen">
      <Disclosure as="nav" className="bg-transparent pt-3">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-100 hover:bg-white hover:text-purple-950 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <h1 className="text-white font-bold sm:text-xs">
                      ProsperChain
                    </h1>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="rounded-full bg-transparent p-1 text-white hover:text-purple-950 hover:bg-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={() => {
                                Cookies.remove("authToken");
                                navigate("/", { replace: true });
                              }}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Fragment key={item.name}>
                    {item.subitems ? (
                      <>
                        <Disclosure.Button
                          as={Link}
                          to={item.href}
                          className={classNames(
                            Active === item.name
                              ? "bg-white text-purple-950"
                              : "text-white hover:bg-white hover:text-purple-950",
                            "block rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          onClick={() => {
                            setActive(item.name);
                            setIsOpen((prevOpen) =>
                              prevOpen === item.name ? false : true
                            );
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span>{item.name}</span>
                          </div>
                        </Disclosure.Button>
                        {isOpen && (
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Disclosure.Panel>
                              <div className="py-1">
                                {item.subitems.map((subitem) => (
                                  <Link
                                    key={subitem.name}
                                    to={subitem.href}
                                    className={classNames(
                                      Active === subitem.name
                                        ? "bg-white text-purple-950"
                                        : "text-gray-200 hover:bg-white hover:text-purple-950",
                                      "block rounded-md px-3 py-2 text-sm font-medium"
                                    )}
                                    onClick={() => {
                                      setActive(subitem.name);
                                      open = false;
                                    }}
                                  >
                                    {subitem.name}
                                  </Link>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </Transition>
                        )}
                      </>
                    ) : (
                      <Disclosure.Button
                        as={Link}
                        to={item.href}
                        className={classNames(
                          Active === item.name
                            ? "bg-white text-purple-950"
                            : "text-white hover:bg-white hover:text-purple-950",
                          "block rounded-md px-3 py-2 text-base font-medium"
                        )}
                        onClick={() => {
                          setActive(item.name);
                          setIsOpen(false);
                        }}
                        aria-current={Active ? "page" : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    )}
                  </Fragment>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure as="nav" className="bg-tansparent">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-center">
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) =>
                        item.subitems ? (
                          <Menu key={item.name}>
                            {({ open }) => (
                              <>
                                <div>
                                  <Menu.Button
                                    className={classNames(
                                      Active === item.name
                                        ? "bg-white text-purple-950"
                                        : "text-gray-200 hover:bg-white hover:text-purple-950",
                                      "rounded-md px-3 py-2 text-sm font-medium"
                                    )}
                                    aria-current={Active ? "page" : undefined}
                                    onClick={() => setActive(item.name)}
                                  >
                                    {item.name}
                                  </Menu.Button>
                                </div>
                                <Transition
                                  show={open}
                                  as={Fragment}
                                  enter="transition ease-out duration-100"
                                  enterFrom="transform opacity-0 scale-95"
                                  enterTo="transform opacity-100 scale-100"
                                  leave="transition ease-in duration-75"
                                  leaveFrom="transform opacity-100 scale-100"
                                  leaveTo="transform opacity-0 scale-95"
                                >
                                  <Menu.Items
                                    static
                                    className="absolute right-[17rem] top-12 z-20  mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                  >
                                    <div className="py-1">
                                      {item.subitems.map((subitem) => (
                                        <Menu.Item key={subitem.name}>
                                          {({ active }) => (
                                            <a
                                              href={subitem.href}
                                              className={`${
                                                active
                                                  ? "bg-gray-100 text-gray-900"
                                                  : "text-gray-700"
                                              } block px-4 py-2 text-sm`}
                                              onClick={() =>
                                                setActive(item.name)
                                              }
                                            >
                                              {subitem.name}
                                            </a>
                                          )}
                                        </Menu.Item>
                                      ))}
                                    </div>
                                  </Menu.Items>
                                </Transition>
                              </>
                            )}
                          </Menu>
                        ) : (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              Active === item.name
                                ? "bg-white text-purple-950"
                                : "text-gray-200 hover:bg-white hover:text-purple-950",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={Active ? "page" : undefined}
                            onClick={() => setActive(item.name)}
                          >
                            {item.name}
                          </a>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
