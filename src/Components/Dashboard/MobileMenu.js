import React from 'react'
import { Link } from 'react-router-dom';
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";

export default function MobileMenu(props) {
  return (
    <div>
       <Disclosure.Panel className="sm:hidden">
  <div className="space-y-1 px-2 pb-3 pt-2">
    {props.navigation.map((item) => (
      <Fragment key={item.name}>
        {item.subitems ? (
          <>
            <Disclosure.Button
              as={Link}
              to={item.href}
              className={props.classNames(
                props.Active === item.name
                  ? "bg-white text-purple-950"
                  : "text-white hover:bg-white hover:text-purple-950",
                "block rounded-md px-3 py-2 text-sm font-medium"
              )}
              onClick={() => {
                props.setActive(item.name);
                props.setIsOpen((prevOpen) =>
                  prevOpen === item.name ? false : true
                );
              }}
            >
              <div className="flex items-center justify-between">
                <span>{item.name}</span>
              </div>
            </Disclosure.Button>
            {props.isOpen && (
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
                        className={props.classNames(
                          props.Active === subitem.name
                            ? "bg-white text-purple-950"
                            : "text-gray-200 hover:bg-white hover:text-purple-950",
                          "block rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        onClick={() => {props.setActive(subitem.name)
                        // open =false
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
            className={props.classNames(
              props.Active === item.name
                ? "bg-white text-purple-950"
                : "text-white hover:bg-white hover:text-purple-950",
              "block rounded-md px-3 py-2 text-base font-medium"
            )}
            onClick={() => {
              props.setActive(item.name);
              props.setIsOpen(false);
            }}
            aria-current={props.Active ? "page" : undefined}
          >
            {item.name}
          </Disclosure.Button>
        )}
      </Fragment>
    ))}
  </div>
</Disclosure.Panel>
    </div>
  )
}
