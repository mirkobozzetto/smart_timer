import React from "react";
import useTimer from "../hooks/useTimer";

interface TimerButtonsProps {
  hoursRef: React.RefObject<HTMLInputElement>;
  minutesRef: React.RefObject<HTMLInputElement>;
  secondsRef: React.RefObject<HTMLInputElement>;
  isRunning: boolean;
  startTimer: () => void;
  stopTimer: () => void;
}

const TimerButtons = ({
  hoursRef,
  minutesRef,
  secondsRef,
}: TimerButtonsProps) => {
  const { startTimer, stopTimer, isRunning, timeLeft } = useTimer({
    hoursRef,
    minutesRef,
    secondsRef,
    initialHours: parseInt(hoursRef.current?.value || "0"),
    initialMinutes: parseInt(minutesRef.current?.value || "0"),
    initialSeconds: parseInt(secondsRef.current?.value || "0"),
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
        className="m-2 px-4 py-2 rounded text-white"
      >
        Start
      </button>
      <button
        onClick={stopTimer}
        disabled={!isRunning}
        className="m-2 px-4 py-2 rounded text-white"
      >
        Stop
      </button>
      {isRunning && <p className="text-white">Time left: {timeLeft} seconds</p>}
    </div>
  );
};

export default TimerButtons;
