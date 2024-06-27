import { useTimeStore } from "../store/timeStore";

const TimerButtons = () => {
  const { inputHours, inputMinutes, inputSeconds, createTimer } =
    useTimeStore();

  const handleCreateTimer = () => {
    createTimer();
  };

  const isTimerSet =
    parseInt(inputHours) > 0 ||
    parseInt(inputMinutes) > 0 ||
    parseInt(inputSeconds) > 0;

  return (
    <div className="text-center">
      <button
        onClick={handleCreateTimer}
        disabled={!isTimerSet}
        className="m-2 px-4 py-2 rounded text-white"
      >
        Create Timer
      </button>
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
//     isRunning,
//     setTimeLeft,
//     timeLeft,
//   } = useTimeStore();
//   const [showCircularTimer, setShowCircularTimer] = useState(false);

//   useEffect(() => {
//     if (timeLeft === 0 && !isRunning) {
//       setShowCircularTimer(false);
//     }
//   }, [timeLeft, isRunning]);

//   const handleStartTimer = () => {
//     const totalSeconds =
//       parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
//     if (totalSeconds > 0) {
//       setTimeLeft(totalSeconds);
//       setShowCircularTimer(true);
//       startTimer();
//     }
//   };

//   const isTimerSet =
//     parseInt(hours) > 0 || parseInt(minutes) > 0 || parseInt(seconds) > 0;

//   return (
//     <div className="text-center">
//       <button
//         onClick={handleStartTimer}
//         disabled={isRunning || !isTimerSet}
//         className="m-2 px-4 py-2 rounded text-white"
//       >
//         Start
//       </button>
//       {showCircularTimer && <CircularTimer />}
//     </div>
//   );
// };

// export default TimerButtons;
