import { useState } from "react";
import { useTimeStore } from "../store/timeStore";
import CircularTimer from "./CircularTimer";

const TimerButtons = () => {
  const {
    hours,
    minutes,
    seconds,
    startTimer,
    stopTimer,
    isRunning,
    setTimeLeft,
  } = useTimeStore();
  const [showCircularTimer, setShowCircularTimer] = useState(false);

  const handleStartTimer = () => {
    const totalSeconds =
      parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
    if (totalSeconds > 0) {
      setTimeLeft(totalSeconds);
      setShowCircularTimer(true);
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
      {showCircularTimer && <CircularTimer />}
    </div>
  );
};

export default TimerButtons;

// import { useEffect, useState } from "react";
// import { useTimeStore } from "../store/timeStore";
// import CircularTimer from "./CircularTimer";

// const TimerButtons = () => {
//   const {
//     hours,
//     minutes,
//     seconds,
//     startTimer,
//     stopTimer,
//     isRunning,
//     timeLeft,
//     tick,
//   } = useTimeStore();
//   const [hasStarted, setHasStarted] = useState(false);

//   useEffect(() => {
//     let timerId: NodeJS.Timeout | undefined;
//     if (isRunning && timeLeft > 0) {
//       timerId = setInterval(tick, 1000);
//     } else if (!isRunning) {
//       clearInterval(timerId);
//     }
//     return () => clearInterval(timerId);
//   }, [isRunning, timeLeft, tick]);

//   const handleStartTimer = () => {
//     if (parseInt(hours) + parseInt(minutes) + parseInt(seconds) > 0) {
//       startTimer();
//       setHasStarted(true);
//     }
//   };

//   return (
//     <div className="text-center">
//       <button
//         onClick={handleStartTimer}
//         disabled={
//           isRunning ||
//           parseInt(hours) + parseInt(minutes) + parseInt(seconds) === 0
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
//       {/* {isRunning && <p className="text-white">Time left: {timeLeft} seconds</p>} */}
//       {hasStarted && <CircularTimer />}
//     </div>
//   );
// };

// export default TimerButtons;
