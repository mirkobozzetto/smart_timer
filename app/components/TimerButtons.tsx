// TimerButtons.tsx
import React from "react";
import useTimer from "../hooks/useTimer";

interface TimerButtonsProps {
  hoursRef: React.RefObject<HTMLInputElement>;
  minutesRef: React.RefObject<HTMLInputElement>;
  secondsRef: React.RefObject<HTMLInputElement>;
}

const TimerButtons: React.FC<TimerButtonsProps> = ({
  hoursRef,
  minutesRef,
  secondsRef,
}) => {
  const { startTimer, stopTimer, isRunning, timeLeft } = useTimer({
    hoursRef,
    minutesRef,
    secondsRef,
  });

  return (
    <div className="text-center">
      <button
        onClick={startTimer}
        disabled={
          isRunning ||
          !(
            hoursRef.current?.value ||
            minutesRef.current?.value ||
            secondsRef.current?.value
          )
        }
        className="bg-green-500 m-2 px-4 py-2 rounded text-white"
      >
        Start
      </button>
      <button
        onClick={stopTimer}
        disabled={!isRunning}
        className="bg-red-500 m-2 px-4 py-2 rounded text-white"
      >
        Stop
      </button>
      {isRunning && <p>Time left: {timeLeft} seconds</p>}
    </div>
  );
};

export default TimerButtons;
