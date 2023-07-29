import React from "react";

const Skeleton = () => {
  return (
    <div
      role="status"
      className="w-full min-w-[50px] space-y-4 divide-y animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
    >
      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full mb-2.5"></div>

      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Skeleton;
