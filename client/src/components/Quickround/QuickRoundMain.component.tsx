import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface CountdownTimerProps {
  initialSeconds: number;
  onTimerEnd: () => void;
}

const QuickRoundMain: React.FC<CountdownTimerProps> = ({
  initialSeconds,
  onTimerEnd,
}) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  const navigate = useNavigate();

  const toggleTimer = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const resetTimer = () => {
    setSeconds(initialSeconds);
    setIsRunning(false);
  };

  const goToScoreDisplay = () => {
    navigate("/scoredisplay");
  };

  const goToMainRound = () => {
    navigate("/mainround?idQuestions=1");
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === " ") {
        toggleTimer();
      } else if (event.key === "r") {
        resetTimer();
      } else if (event.key === "s") {
        goToScoreDisplay();
      } else if (event.key === "m") {
        goToMainRound();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleTimer, resetTimer, goToScoreDisplay, goToMainRound]);

  useEffect(() => {
    if (isRunning && seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prevSeconds: number) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (isRunning && seconds === 0) {
      setIsRunning(false);
      onTimerEnd();
    }
  }, [seconds, isRunning, onTimerEnd]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <h1 className="text-3xl font-bold mb-4">Countdown Timer</h1>
      <p className="text-5xl font-extrabold mb-8">{formatTime(seconds)}</p>
      <div className="flex flex-wrap space-x-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full mb-4 w-full sm:w-auto"
          onClick={toggleTimer}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-full mb-4 w-full sm:w-auto"
          onClick={resetTimer}
        >
          Reset (R)
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-full mb-4 w-full sm:w-auto"
          onClick={goToScoreDisplay}
        >
          Go to ScoreDisplay (S)
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded-full mb-4 w-full sm:w-auto"
          onClick={goToMainRound}
        >
          Go to MainRound (M)
        </button>
      </div>
    </div>
  );
};

export default QuickRoundMain;
