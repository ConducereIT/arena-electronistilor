// src/App.tsx
import React from 'react';
import Leaderboard from '../components/MainRound/Leaderboard';
import QuestionComponent from '../components/MainRound/QuestionComponent';

const App: React.FC = () => {
  const users = [
    { id: 1, name: 'John', score: 150 },
    { id: 2, name: 'Alice', score: 200 },
    { id: 3, name: 'Bob', score: 120 },
    { id: 4, name: 'Bog1', score: 115 },
    { id: 5, name: 'Bob2', score: 91 },
    { id: 6, name: 'Bob3', score: 45 },
    { id: 7, name: 'Bob4', score: 32 },
    { id: 8, name: 'Bob5', score: 21 },
    { id: 8, name: 'Bob6', score: 12 },
    // Add more users as needed
  ];
  const answer = [
    { index: 1, text: 'A' },
    { index: 2, text: 'B' },
    { index: 3, text: 'C' },
    { index: 4, text: 'D' },
    { index: 5, text: 'E' },
    { index: 1, text: 'F' },
    // Add more users as needed
  ];

  return (
    <div className="flex">
      <Leaderboard users={users} />
      <QuestionComponent
        questionTitle="Your Question Title"
        getAnswersFromBackend={() => Promise.resolve([])} // Replace with your actual function
        
      />
    </div>
  );
};

export default App;
