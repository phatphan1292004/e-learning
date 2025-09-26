import React from "react";

const LoadingPlayer = () => {
  return (
    <div>
      <div className="aspect-video rounded-lg skeleton"></div>
      <div className="flex items-center justify-end mt-5 mb-5 gap-5">
        <div className="size-10 skeleton rounded-lg"></div>
        <div className="size-10 skeleton rounded-lg"></div>
      </div>
      <div className="w-full rounded-lg h-9 mb-10 skeleton"></div>
    </div>
  );
};

export default LoadingPlayer;
