import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import React, { Fragment } from "react";

interface OptionMenuProps {
  firstActionLabel: string;
  firstAction: () => void;
  secondActionLabel?: string;
  secondAction?: () => void;
  thirdActionLabel?: string;
  thirdAction?: () => void;
}

const OptionMenu: React.FC<OptionMenuProps> = ({
  firstActionLabel,
  firstAction,
  secondActionLabel,
  secondAction,
  thirdActionLabel,
  thirdAction,
}) => {
  return (
    <Menu as="div" className="relative flex-none">
      <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
        <span className="sr-only">Open options</span>
        <EllipsisVerticalIcon className="w-5 h-5" aria-hidden="true" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 w-32 py-2 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
          <Menu.Item>
            <a
              href="#"
              onClick={firstAction}
              className={` bg-gray-50 block px-3 py-1 text-sm leading-6 text-gray-900 cursor-pointer
          `}
            >
              {firstActionLabel}
              <span className="sr-only">, {firstActionLabel}</span>
            </a>
          </Menu.Item>
          {secondActionLabel && (
            <Menu.Item>
              <a
                href="#"
                onClick={secondAction}
                className={` bg-gray-50 block px-3 py-1 text-sm leading-6 text-gray-900 cursor-pointer
          `}
              >
                {secondActionLabel}
                <span className="sr-only">, {secondActionLabel}</span>
              </a>
            </Menu.Item>
          )}
          {thirdActionLabel && (
            <Menu.Item>
              <a
                href="#"
                onClick={thirdAction}
                className={` bg-gray-50 block px-3 py-1 text-sm leading-6 text-gray-900 cursor-pointer
          `}
              >
                {thirdActionLabel}
                <span className="sr-only">, {thirdActionLabel}</span>
              </a>
            </Menu.Item>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default OptionMenu;
