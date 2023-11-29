import React, { FC } from 'react';

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

  return (
    <div className="max-w-md mx-0 my-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="py-2">Rank</th>
            <th className="py-2">Name</th>
            <th className="py-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user, index) => (
            <tr key={user.id} className="border-t">
              <td className="py-2">{index + 1}</td>
              <td className="py-2">{user.name}</td>
              <td className="py-2">{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;