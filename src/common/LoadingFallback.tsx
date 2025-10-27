import React from "react";
import { ThreeDots } from "react-loader-spinner";

const LoadingFallback: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center gap-4 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <ThreeDots
          height="50"
          width="50"
          color="#2563EB"
          radius="9"
          ariaLabel="three-dots-loading"
          visible={true}
        />
        <p className="text-gray-700 dark:text-gray-200 font-medium text-lg">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default LoadingFallback;
