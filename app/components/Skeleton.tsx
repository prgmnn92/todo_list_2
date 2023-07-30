import React from "react";

const Skeleton = () => {
  return (
    <div
      role="status"
      className="w-full min-w-[50px] divide-y animate-pulse dark:divide-gray-500  dark:border-gray-500"
    >
      <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-400 w-full mb-2.5"></div>

      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Skeleton;
