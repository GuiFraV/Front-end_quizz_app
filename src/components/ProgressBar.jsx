import React from 'react';

const ProgressBar = ({ timer }) => {
  const width = (timer / 60) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-violet rounded-full h-2 transition-all duration-1000"
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;