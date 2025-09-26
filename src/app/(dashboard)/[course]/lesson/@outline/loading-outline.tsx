import React from "react";

const LoadingOutline = () => {
  return (
    <div>
      <div className="h-3 w-full rounded-full skeleton"></div>
      <div className="flex flex-col gap-5">
        <div className="skeleton h-14 w-full rounded-lg"></div>
        <div className="skeleton h-14 w-full rounded-lg"></div>
        <div className="skeleton h-14 w-full rounded-lg"></div>
      </div>
    </div>
  );
};

export default LoadingOutline;
