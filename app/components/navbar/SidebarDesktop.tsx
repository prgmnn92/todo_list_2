"use client";
import React, { useCallback } from "react";
import Image from "next/image";

import { SafeUser } from "@/app/types";

import Logo from "./Logo";
import { INavigationItem } from "./Navbar";
import NavItem from "./NavItem";
import useLoginModal from "@/app/hooks/useLoginModal";
import Avatar from "../Avatar";

interface SidebarDesktopProps {
  navItems: INavigationItem[];
  currentUser?: SafeUser | null;
}

const SidebarDesktop: React.FC<SidebarDesktopProps> = ({
  navItems,
  currentUser,
}) => {
  const loginModal = useLoginModal();

  const toggle = useCallback(() => {
    if (!currentUser) {
      loginModal.onOpen();
    }
  }, [currentUser, loginModal]);

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-72 lg:flex-col">
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
                  <NavItem
                    key={item.name}
                    name={item.name}
                    href={item.href}
                    isCurrent={item.current}
                    icon={item.icon}
                  />
                ))}
              </ul>
            </li>
            <li className="mt-auto -mx-6">
              <a
                href="#"
                onClick={toggle}
                className="flex items-center px-6 py-3 text-sm font-semibold leading-6 text-gray-900 gap-x-4 hover:bg-gray-50"
              >
                <Avatar src={currentUser?.image} />

                <span className="sr-only">Your profile</span>
                <span aria-hidden="true">{currentUser?.name || "Login"}</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SidebarDesktop;
