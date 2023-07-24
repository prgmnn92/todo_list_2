import Image from "next/image";
import React from "react";

interface AvatarProps {
  src?: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      className="w-8 h-8 rounded-full bg-gray-50"
      src={src || "/images/placeholder.jpg"}
      alt=""
      width={400}
      height={400}
    />
  );
};

export default Avatar;
