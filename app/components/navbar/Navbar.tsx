"use client";
import {
  CalendarIcon,
  FolderIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import SidebarMobile from "./SidebarMobile";
import SidebarDesktop from "./SidebarDesktop";
import { SafeUser } from "@/app/types";
import { usePathname } from "next/navigation";

export interface INavigationItem {
  name: string;
  href: string;
  icon: any;
  current: boolean;
}

const navigation: INavigationItem[] = [
  { name: "Dashboard", href: "/", icon: HomeIcon, current: true },
  //   { name: "Team", href: "#", icon: UsersIcon, current: false },
  { name: "Projects", href: "/projects", icon: FolderIcon, current: false },
  { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
  //   { name: "Documents", href: "#", icon: DocumentDuplicateIcon, current: false },
  //   { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
];

interface NavbarProps {
  children: React.ReactNode;
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ children, currentUser }) => {
  const pathname = usePathname();

  const updatedNavItems = navigation.map((navItem) => ({
    ...navItem,
    current: pathname === navItem.href ? true : false,
  }));
  return (
    <>
      <div>
        <SidebarMobile currentUser={currentUser} navItems={updatedNavItems} />
        <SidebarDesktop currentUser={currentUser} navItems={updatedNavItems} />
        <div>{children}</div>
      </div>
    </>
  );
};

export default Navbar;
