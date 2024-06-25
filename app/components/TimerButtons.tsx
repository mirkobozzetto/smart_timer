import { useEffect } from "react";
import { useTimeStore } from "../store/timeStore";

const TimerButtons = () => {
  const {
    hours,
    minutes,
    seconds,
    startTimer,
    stopTimer,
    isRunning,
    timeLeft,
    tick,
  } = useTimeStore();

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;
    if (isRunning && timeLeft > 0) {
      timerId = setInterval(tick, 1000);
    } else if (!isRunning) {
      clearInterval(timerId);
    }
    return () => clearInterval(timerId);
  }, [isRunning, timeLeft, tick]);

  const handleStartTimer = () => {
    if (parseInt(hours) + parseInt(minutes) + parseInt(seconds) > 0) {
      startTimer();
    }
  };

  return (
    <div className="text-center">
      <button
        onClick={handleStartTimer}
        disabled={
          isRunning ||
          parseInt(hours) + parseInt(minutes) + parseInt(seconds) === 0
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
// import React from "react";
// import useTimer from "../hooks/useTimer";

// interface TimerButtonsProps {
//   hoursRef: React.RefObject<HTMLInputElement>;
//   minutesRef: React.RefObject<HTMLInputElement>;
//   secondsRef: React.RefObject<HTMLInputElement>;
//   isRunning: boolean;
//   startTimer: () => void;
//   stopTimer: () => void;
// }

// const TimerButtons = ({
//   hoursRef,
//   minutesRef,
//   secondsRef,
// }: TimerButtonsProps) => {
//   const { startTimer, stopTimer, isRunning, timeLeft } = useTimer({
//     hoursRef,
//     minutesRef,
//     secondsRef,
//     initialHours: parseInt(hoursRef.current?.value || "0"),
//     initialMinutes: parseInt(minutesRef.current?.value || "0"),
//     initialSeconds: parseInt(secondsRef.current?.value || "0"),
//   });

//   return (
//     <div className="text-center">
//       <button
//         onClick={startTimer}
//         disabled={
//           isRunning ||
//           !(
//             hoursRef.current?.value ||
//             minutesRef.current?.value ||
//             secondsRef.current?.value
//           )
//         }
//         className="m-2 px-4 py-2 rounded text-white"
//       >
//         Start
//       </button>
//       <button
//         onClick={stopTimer}
//         disabled={!isRunning}
//         className="m-2 px-4 py-2 rounded text-white"
//       >
//         Stop
//       </button>
//       {isRunning && <p className="text-white">Time left: {timeLeft} seconds</p>}
//     </div>
//   );
// };

// export default TimerButtons;
