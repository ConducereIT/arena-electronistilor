import React, { FC, useState, useEffect, useCallback } from 'react';

interface User {
  id: number;
  name: string;
  score: number;
}

interface LeaderboardProps {
  users: User[];
}

const Leaderboard: FC<LeaderboardProps> = ({ users }) => {
  const sortedUsers = [...users].sort((a, b) => b.score - a.score);
  const top3Users = sortedUsers.slice(0, 3);
  const top10Users = sortedUsers.slice(0, 10);

  const [expanded, setExpanded] = useState(false);

  // Toggle the leaderboard when "L" key is pressed
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'l' || event.key === 'L') {
        setExpanded((prevExpanded) => !prevExpanded);
      }
    },
    [setExpanded]
  );

  // Listen for "L" key press
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div
      className={`w-1/5 p-6 rounded-md shadow-md bg-gradient-to-br from-stone-950 to-gray-800 text-white ${
        expanded ? 'max-h-full' : 'max-h-100'
      }`}
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">Leaderboard</h2>
      {(expanded ? top10Users : top3Users).map((user, index) => (
        <div
          key={user.id}
          className={`my-4 p-4 rounded-md shadow-md flex items-center justify-between ${
            index % 2 === 0 ? 'bg-dark-gray' : 'bg-light-gray'
          }`}
          style={{
            background: 'linear-gradient(to bottom right, #e2e8f0, #2d3748)',
          }}
        >
          <p className="text-xl font-semibold text-black">{index + 1}. {user.name}</p>
          <p className="text-gray-600">Score: {user.score}</p>
        </div>
      ))}
    </div>
  );
};

export default Leaderboard;
