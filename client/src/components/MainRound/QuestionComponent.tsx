import React, { useState, useEffect, useRef } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import tick from '../../assets/tick.mp3';

interface Answer {
  index: number;
  text: string;
}

interface QuestionComponentProps {
  questionTitle: string;
  getAnswersFromBackend: () => Promise<Answer[]>;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({
  questionTitle,
  getAnswersFromBackend,
}) => {
  const [counter, setCounter] = useState<number>(30);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [spacePressed, setSpacePressed] = useState<boolean>(false);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const intervalRef = useRef<number>();
  const tickSound = new Audio(tick);

  const toggleTimer = () => setIsRunning((prevIsRunning) => !prevIsRunning);
  const resetCounter = () => {
    setIsRunning(false);
    setCounter(30);
    setSelectedAnswer(null);
  };

  const loadAnswers = async () => setAnswers(await getAnswersFromBackend());
  const toggleAnswer = (index: number) =>
    setSelectedAnswer((prevSelectedAnswer) =>
      prevSelectedAnswer === index ? null : index
    );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space' && !spacePressed) {
        setSpacePressed(true);
        toggleTimer();
      }

      if (event.code === 'KeyR' && !spacePressed) {
        setSpacePressed(true);
        resetCounter();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === 'Space' || event.code === 'KeyR') {
        setSpacePressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [spacePressed, toggleTimer, resetCounter]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setCounter((prevCounter) => {
          if (prevCounter > 0) {
            tickSound.play();
            return prevCounter - 1;
          } else {
            setIsRunning(false);
            return 0;
          }
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current!);
    }

    return () => clearInterval(intervalRef.current!);
  }, [isRunning]);

  return (
    <div className="p-4 rounded-md bg-gray-300">
      <div className="text-center">
        <div className="rounded-full p-2 mb-4 inline-block">
          <h2 className="text-2xl font-bold text-white">{questionTitle}</h2>
        </div>

        <div className="flex justify-center items-center">
          <div className="w-16 h-16">
            <CircularProgressbar
              value={(counter / 30) * 100}
              text={`${counter}s`}
              styles={buildStyles({
                strokeLinecap: 'round',
                textSize: '16px',
                pathColor: isRunning ? '#4285f4' : '#d50000', // Blue when running, red when paused
                textColor: 'text-white',
                trailColor: 'bg-gray-300',
              })}
            />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={loadAnswers}>
          Load Answers
        </button>

        <div className="grid grid-cols-2 grid-rows-3 gap-4 mt-4">
          {answers.map((answer) => (
            <div
              key={answer.index}
              className={`answer p-4 ${
                selectedAnswer === answer.index ? 'bg-gray-200' : 'bg-white'
              }`}
              onClick={() => toggleAnswer(answer.index)}
            >
              {selectedAnswer === answer.index ? (
                <div className="answer-content">{answer.text}</div>
              ) : (
                <div>Index: {answer.index}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionComponent;
