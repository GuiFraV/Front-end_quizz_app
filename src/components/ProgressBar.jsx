import React from 'react';

const ProgressBar = ({ timer, isMobile }) => {
  const width = (timer / 10) * 100;

  return (
    <div className={` bg-gray-200 rounded-full h-2 ${isMobile ? "w-[95%]" : "w-full"}`}>
      <div
        className="bg-violet rounded-full h-2 transition-all duration-1000"
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;