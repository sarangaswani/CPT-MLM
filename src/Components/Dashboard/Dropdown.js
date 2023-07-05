import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

function DropdownButton(props) {
  return (
    <Menu as="div" className="relative inline-block text-left w-full  sm:w-auto">
      <div>
        <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-black bg-white rounded-md focus:outline-none focus-visible:ring-2 ring-1 ring-black focus-visible:ring-purple-400 focus-visible:ring-opacity-75">
          {props.name}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 ml-2 -mr-1 transition-transform duration-300 transform"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 14l6-6H4l6 6z"
            />
          </svg>
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
        <Menu.Items className="absolute z-10 right-0 w-40 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-3">
            <p className="text-sm text-gray-700">Menu Item 1</p>
          </div>
          <div className="px-4 py-3">
            <p className="text-sm text-gray-700">Menu Item 2</p>
          </div>
          <div className="px-4 py-3">
            <p className="text-sm text-gray-700">Menu Item 3</p>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default DropdownButton;
