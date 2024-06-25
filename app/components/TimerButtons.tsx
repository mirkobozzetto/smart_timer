import React from "react";

interface TimerButtonsProps {
  onStart: () => void;
  onStop: () => void;
  isRunning: boolean;
  hoursRef: React.RefObject<HTMLInputElement>;
  minutesRef: React.RefObject<HTMLInputElement>;
  secondsRef: React.RefObject<HTMLInputElement>;
}

const TimerButtons = ({
  onStart,
  onStop,
  isRunning,
  hoursRef,
  minutesRef,
  secondsRef,
}: TimerButtonsProps) => {
  const canStart = () => {
    const hours = parseInt(hoursRef.current?.value ?? "0", 10);
    const minutes = parseInt(minutesRef.current?.value ?? "0", 10);
    const seconds = parseInt(secondsRef.current?.value ?? "0", 10);
    return hours > 0 || minutes > 0 || seconds > 0;
  };

  const handleStart = () => {
    if (!canStart()) {
      console.log("Cannot start timer as all values are zero.");
      return;
    }
    const hours = hoursRef.current?.value ?? "00";
    const minutes = minutesRef.current?.value ?? "00";
    const seconds = secondsRef.current?.value ?? "00";
    console.log(`Starting timer at: ${hours}:${minutes}:${seconds}`);
    onStart();
  };

  const handleStop = () => {
    console.log("Stopping timer.");
    onStop();
  };

  return (
    <div className="text-center">
      <button
        onClick={handleStart}
        disabled={isRunning || !canStart()}
        className="bg-green-500 m-2 px-4 py-2 rounded text-white"
      >
        Start
      </button>
      <button
        onClick={handleStop}
        disabled={!isRunning}
        className="bg-red-500 m-2 px-4 py-2 rounded text-white"
      >
        Stop
      </button>
    </div>
  );
};

export default TimerButtons;
