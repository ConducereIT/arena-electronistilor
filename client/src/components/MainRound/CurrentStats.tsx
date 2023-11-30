import React, { FC, useState } from 'react';

interface CurrentStatsProps {
  currentScore: number;
  currentLife: number;
}

const CurrentStats: FC<CurrentStatsProps> = ({ currentScore, currentLife }) => {
  return (
    <div className="w-1/5 p-6 rounded-md shadow-md bg-gradient-to-br from-blue-500 to-blue-800 text-white" style={{ position: 'absolute', right: 0 }}>
      <h2 className="text-2xl font-semibold mb-4 text-center">Current Stats</h2>
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Score: {currentScore}</p>
        <p className="text-lg font-semibold">Life: {currentLife}</p>
      </div>
    </div>
  );
};

export default CurrentStats;
