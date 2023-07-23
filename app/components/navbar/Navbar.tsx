"use client";
import { Fragment, useState } from "react";
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import SidebarMobile from "./SidebarMobile";
import SidebarDesktop from "./SidebarDesktop";

export interface INavigationItem {
  name: string;
  href: string;
  icon: any;
  current: boolean;
}

const navigation: INavigationItem[] = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
  //   { name: "Team", href: "#", icon: UsersIcon, current: false },
  { name: "Projects", href: "#", icon: FolderIcon, current: false },
  { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
  //   { name: "Documents", href: "#", icon: DocumentDuplicateIcon, current: false },
  //   { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
];

interface NavbarProps {
  children: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  return (
    <>
      {/*
        This Navbar requires updating your template:

        ```
 
        ```
      */}
      <div>
        <SidebarMobile navItems={navigation} />
        <SidebarDesktop navItems={navigation} />

        {/* Static sidebar for desktop */}

        {/* <main className="py-10 lg:pl-72">
          <div className="px-4 sm:px-6 lg:px-8"></div>
        </main> */}
        <div>{children}</div>
      </div>
    </>
  );
};

export default Navbar;
