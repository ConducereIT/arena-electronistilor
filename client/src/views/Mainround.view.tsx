// src/App.tsx
import React, { FC, useState } from 'react';
import Leaderboard from '../components/MainRound/Leaderboard';
import QuestionComponent from '../components/MainRound/QuestionComponent';
import CurrentStats from '../components/MainRound/CurrentStats'; 

const App: React.FC = () => {
  const users = [
    { id: 1, name: 'A', score: 300 },
    { id: 2, name: 'B', score: 220 },
    { id: 3, name: 'C', score: 120 },
    { id: 4, name: 'D', score: 400 },
    { id: 5, name: 'John', score: 150 },
    { id: 6, name: 'Alice', score: 200 },
    { id: 7, name: 'Bob', score: 120 },
    { id: 8, name: 'Bog1', score: 115 },
    { id: 9, name: 'Bob2', score: 91 },
    { id: 10, name: 'Bob3', score: 45 },
    { id: 11, name: 'Bob4', score: 32 },
    { id: 12, name: 'Bob5', score: 21 },
    { id: 13, name: 'Bob6', score: 12 },
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
  const initialUsers = [
    { id: 1, name: 'User 1', score: 120 },
    { id: 2, name: 'User 2', score: 90 },
    // Add more users as needed
  ];

  const [currentScore, setCurrentScore] = useState(0);
  const [currentLife, setCurrentLife] = useState(0);

  return (
    <div className="flex">
      <Leaderboard users={users} />
      <QuestionComponent
        questionTitle="Your Question Title"
        getAnswersFromBackend={() => Promise.resolve([])} // Replace with your actual function
      />
       <CurrentStats currentScore={currentScore} currentLife={currentLife} />
    </div>
  );
};

export default App;
