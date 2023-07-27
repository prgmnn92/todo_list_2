"use client";
import React from "react";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: any;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
  relative
  disabled:opacity-70
  disabled:cursor-not-allowed
  rounded-lg
  hover:opacity-80
  transition
  w-full
  ${Icon ? "pl-10 pr-6" : "px-2"}
  ${outline ? "bg-white" : "bg-indigo-500"}
  ${outline ? "border-black" : "border-indigo-500"}
  ${outline ? "text-black" : "text-white"}
  ${small ? "py-1" : "py-3"}
  ${small ? "text-sm" : "text-md"}
  ${small ? "font-light" : "font-semibold"}
  ${small ? "border-[1px]" : "border-2"}
  `}
    >
      {Icon && (
        <Icon
          size={small ? 18 : 24}
          className={`${
            small ? "absolute left-4 top-[5px]" : "absolute left-4 top-3"
          } `}
        />
      )}
      {label}
    </button>
  );
};

export default Button;
