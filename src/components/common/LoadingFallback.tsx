import React from "react";
import { RotatingLines } from "react-loader-spinner";

const LoadingFallback: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 bg-white">
      <RotatingLines height="100" width="100" color="#2563EB" visible={true} />
    </div>
  );
};

export default LoadingFallback;
