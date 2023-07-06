import React, { useState } from "react";
import { Link } from "react-router-dom";
export default function DesktopMenu(props) {
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (itemName) => {
    if (activeItem === itemName) {
      setActiveItem(null);
    } else {
      setActiveItem(itemName);
    }
  };
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="relative flex h-16 items-center justify-between">
        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-center">
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4">
            {props.navigation.map((item) => (
        <div key={item.name} className="relative">
          <Link
            to={item.href}
            className={props.classNames(
              activeItem === item.name
                ? 'bg-white text-purple-950'
                : 'text-gray-200 hover:bg-white hover:text-purple-950',
              'rounded-md px-3 py-2 text-sm font-medium'
            )}
            onClick={() => handleItemClick(item.name)}
          >
            {item.name}
              </Link>
          {activeItem === item.name && item.subitems && (
            <div className="absolute top-full left-0 mt-2 z-20 w-[12rem]">
              <div className="py-1 bg-white shadow-lg rounded-md ring-1 ring-black ring-opacity-5">
                {item.subitems.map((subitem) => (
                  <Link
                    key={subitem.name}
                    to={subitem.href}
                    className={`${
                      activeItem === subitem.name
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-700'
                    } block px-4 py-2 text-sm`}
                    onClick={() => handleItemClick(subitem.name)}
                  >
                    {subitem.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
