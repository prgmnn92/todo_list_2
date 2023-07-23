import React from "react";

interface NavItemProps {
  name: string;
  href: string;
  isCurrent: boolean;
  icon: any;
}

const NavItem: React.FC<NavItemProps> = ({
  name,
  href,
  isCurrent,
  icon: Icon,
}) => {
  return (
    <li key={name}>
      <a
        href={href}
        className={`${
          isCurrent
            ? "bg-gray-50 text-indigo-600"
            : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
        }
                            group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold`}
      >
        <Icon
          className={`${
            isCurrent
              ? "text-indigo-600"
              : "text-gray-400 group-hover:text-indigo-600"
          }
                              h-6 w-6 shrink-0`}
          aria-hidden="true"
        />
        {name}
      </a>
    </li>
  );
};

export default NavItem;
