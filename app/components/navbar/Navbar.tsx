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
import { SafeUser } from "@/app/types";

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
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ children, currentUser }) => {
  return (
    <>
      {/*
        This Navbar requires updating your template:

        ```
 
        ```
      */}
      <div>
        <SidebarMobile currentUser={currentUser} navItems={navigation} />
        <SidebarDesktop currentUser={currentUser} navItems={navigation} />
        <div>{children}</div>
      </div>
    </>
  );
};

export default Navbar;
