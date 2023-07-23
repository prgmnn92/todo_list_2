"use client";
import React from "react";
import Logo from "./Logo";
import Image from "next/image";

import { INavigationItem } from "./Navbar";

interface SidebarDesktopProps {
  navItems: INavigationItem[];
}

const SidebarDesktop: React.FC<SidebarDesktopProps> = ({ navItems }) => {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex flex-col px-6 overflow-y-auto bg-white border-r border-gray-200 grow gap-y-5">
        <div className="flex items-center h-16 shrink-0">
          <Logo />
        </div>
        <nav className="flex flex-col flex-1">
          <ul role="list" className="flex flex-col flex-1 gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className={`${
                        item.current
                          ? "bg-gray-50 text-indigo-600"
                          : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                      }
                            group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold`}
                    >
                      <item.icon
                        className={`${
                          item.current
                            ? "text-indigo-600"
                            : "text-gray-400 group-hover:text-indigo-600"
                        }
                              h-6 w-6 shrink-0`}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            <li className="mt-auto -mx-6">
              <a
                href="#"
                className="flex items-center px-6 py-3 text-sm font-semibold leading-6 text-gray-900 gap-x-4 hover:bg-gray-50"
              >
                <Image
                  className="w-8 h-8 rounded-full bg-gray-50"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                  width={400}
                  height={400}
                />
                <span className="sr-only">Your profile</span>
                <span aria-hidden="true">Tom Cook</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SidebarDesktop;
