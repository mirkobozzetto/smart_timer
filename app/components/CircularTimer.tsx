import { useEffect, useState } from "react";
import { useTimeStore } from "../store/timeStore";

interface CircularTimerProps {
  size?: number;
}

const CircularTimer = ({ size = 200 }: CircularTimerProps) => {
  const { timer, startTimer, stopTimer, deleteTimer } = useTimeStore();
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [initialTime, setInitialTime] = useState<number>(0);

  useEffect(() => {
    console.log("Timer object updated: ", timer);
    if (timer) {
      const totalTime = timer.timeLeft * 100;
      setTimeLeft(totalTime);
      setInitialTime(totalTime);
      console.log("Initial total time set:", totalTime);
    }
  }, [timer]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    console.log("Timer running state changed:", timer?.isRunning);
    if (timer?.isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          console.log("Timer tick:", newTime);
          if (newTime <= 0) {
            clearInterval(interval);
            stopTimer();
            console.log("Timer reached zero and stopped");
            return 0;
          }
          return newTime;
        });
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
      console.log("Interval cleared");
    };
  }, [timer?.isRunning, stopTimer]);

  const handleStartPause = () => {
    console.log(
      "Start/Pause button clicked, current running state:",
      timer?.isRunning
    );
    if (timer?.isRunning) {
      stopTimer();
      console.log("Timer paused at:", timeLeft);
    } else {
      startTimer();
      console.log("Timer resumed with initial time:", initialTime);
    }
  };

  const handleDelete = () => {
    deleteTimer();
    console.log("Timer deleted");
  };

  const radius = size / 2;
  const circumference = 2 * Math.PI * (radius - 10);
  const strokeDashoffset = circumference * (1 - timeLeft / (initialTime || 1)); // Prevent NaN by ensuring denominator is not zero

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center border-2 border-white/20 p-5 rounded-lg">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={radius}
          cy={radius}
          r={radius - 10}
          fill="none"
          stroke="#4B4B4B"
          strokeWidth="2.5"
        />
        <circle
          cx={radius}
          cy={radius}
          r={radius - 10}
          fill="none"
          stroke="#C084FC"
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${radius} ${radius})`}
          strokeLinecap="round"
        />
      </svg>
      <div className="mt-4 font-thin text-2xl text-white">
        {formatTime(timeLeft)}
      </div>
      <div className="flex space-x-4 mt-4">
        <button
          className="px-4 py-2 rounded text-white"
          onClick={handleStartPause}
          disabled={timeLeft === 0}
        >
          {timer?.isRunning ? "Pause" : "Démarrer"}
        </button>
        <button className="px-4 py-2 rounded text-white" onClick={handleDelete}>
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default CircularTimer;

// TODO: version qui ne pause pas et ne reprend pas pour le moment( version actuelle)
// import { useEffect, useState } from "react";
// import { useTimeStore } from "../store/timeStore";

// interface CircularTimerProps {
//   size?: number;
// }

// const CircularTimer = ({ size = 200 }: CircularTimerProps) => {
//   const { timer, startTimer, stopTimer, deleteTimer } = useTimeStore();
//   const [timeLeft, setTimeLeft] = useState<number>(0);
//   const [isVisible, setIsVisible] = useState(true);
//   const [showTimer, setShowTimer] = useState(false);

//   useEffect(() => {
//     if (timer) {
//       setTimeLeft(timer.timeLeft * 100);
//     }
//   }, [timer]);

//   useEffect(() => {
//     let interval: NodeJS.Timeout;
//     if (timer?.isRunning && timeLeft > 0) {
//       interval = setInterval(() => {
//         setTimeLeft((prevTime) => {
//           if (prevTime <= 1) {
//             stopTimer();
//             return 0;
//           }
//           return prevTime - 1;
//         });
//       }, 10); // Update every 10ms for smooth animation
//     }
//     return () => clearInterval(interval);
//   }, [timer?.isRunning, timeLeft, stopTimer]);

//   if (!timer || !isVisible) return null;

//   const radius = size / 2;
//   const circumference = 2 * Math.PI * (radius - 10);
//   const initialTotalTime =
//     (parseInt(timer.hours) * 3600 +
//       parseInt(timer.minutes) * 60 +
//       parseInt(timer.seconds)) *
//     100;
//   const strokeDashoffset = circumference * (1 - timeLeft / initialTotalTime);

//   const formatTime = (time: number): string => {
//     const hours = Math.floor(time / 360000);
//     const minutes = Math.floor((time % 360000) / 6000);
//     const seconds = Math.floor((time % 6000) / 100);
//     return `${hours.toString().padStart(2, "0")}:${minutes
//       .toString()
//       .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
//   };

//   // TODO: version qui ne pause pas et ne reprend pas
//   // const handleStartPause = () => {
//   //   if (timer.isRunning) {
//   //     stopTimer();
//   //   } else {
//   //     startTimer();
//   //   }
//   // };

//   // TODO: version qui pause et reprend
//   const handleStartPause = () => {
//     if (!showTimer) {
//       setShowTimer(true);
//       setTimeLeft(timer.timeLeft * 100); // Assurez-vous que timer.timeLeft est initialisé correctement
//     } else if (timer.isRunning) {
//       stopTimer(); // Stoppe l'intervalle
//     } else {
//       startTimer(); // Démarre ou reprend l'intervalle
//     }
//   };

//   const handleDelete = () => {
//     deleteTimer();
//     setIsVisible(false);
//   };

//   return (
//     <div className="flex flex-col items-center border-2 border-white/20 p-5 rounded-lg">
//       <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
//         <circle
//           cx={radius}
//           cy={radius}
//           r={radius - 10}
//           fill="none"
//           stroke="#4B4B4B"
//           strokeWidth="2.5"
//         />
//         <circle
//           cx={radius}
//           cy={radius}
//           r={radius - 10}
//           fill="none"
//           stroke="#C084FC"
//           strokeWidth="2"
//           strokeDasharray={circumference}
//           strokeDashoffset={strokeDashoffset}
//           transform={`rotate(-90 ${radius} ${radius})`}
//           strokeLinecap="round"
//         />
//       </svg>
//       <div className="mt-4 font-thin text-2xl text-white">
//         {formatTime(timeLeft)}
//       </div>
//       <div className="flex space-x-4 mt-4">
//         <button
//           className="px-4 py-2 rounded text-white"
//           onClick={handleStartPause}
//           disabled={timeLeft === 0}
//         >
//           {timer.isRunning ? "Pause" : "Démarrer"}
//         </button>
//         <button className="px-4 py-2 rounded text-white" onClick={handleDelete}>
//           Supprimer
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CircularTimer;

// TODO: version qui pause et reprend
// import { useEffect, useState } from "react";
// import { useTimeStore } from "../store/timeStore";

// interface CircularTimerProps {
//   size?: number;
// }

// const CircularTimer = ({ size = 200 }: CircularTimerProps) => {
//   const {
//     hours,
//     minutes,
//     seconds,
//     isRunning,
//     startTimer,
//     stopTimer,
//     resetTimer,
//   } = useTimeStore();
//   const [timeLeft, setTimeLeft] = useState<number>(0);
//   const [showTimer, setShowTimer] = useState(false);

//   const duration =
//     parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);

//   useEffect(() => {
//     if (showTimer) {
//       setTimeLeft(duration * 100);
//     }
//   }, [duration, showTimer]);

//   useEffect(() => {
//     let interval: NodeJS.Timeout;
//     if (isRunning && timeLeft > 0) {
//       interval = setInterval(() => {
//         setTimeLeft((prevTime) => {
//           if (prevTime <= 1) {
//             stopTimer();
//             setShowTimer(false);
//             return 0;
//           }
//           return prevTime - 1;
//         });
//       }, 10);
//     }
//     return () => clearInterval(interval);
//   }, [isRunning, timeLeft, stopTimer]);

//   const radius = size / 2;
//   const circumference = 2 * Math.PI * (radius - 10);
//   const strokeDashoffset = circumference * (1 - timeLeft / (duration * 100));

//   const formatTime = (time: number): string => {
//     const hours = Math.floor(time / 360000);
//     const minutes = Math.floor((time % 360000) / 6000);
//     const seconds = Math.floor((time % 6000) / 100);
//     return `${hours.toString().padStart(2, "0")}:${minutes
//       .toString()
//       .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
//   };

//   const handleStartPause = () => {
//     if (!showTimer) {
//       setShowTimer(true);
//       setTimeLeft(duration * 100);
//     } else if (isRunning) {
//       stopTimer();
//     } else {
//       startTimer();
//     }
//   };

//   const handleDelete = () => {
//     stopTimer();
//     resetTimer();
//     setTimeLeft(0);
//     setShowTimer(false);
//   };

//   return (
//     <div className="flex flex-col items-center">
//       {showTimer && (
//         <>
//           <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
//             <circle
//               cx={radius}
//               cy={radius}
//               r={radius - 10}
//               fill="none"
//               stroke="#e6e6e6"
//               strokeWidth="10"
//             />
//             <circle
//               cx={radius}
//               cy={radius}
//               r={radius - 10}
//               fill="none"
//               stroke="#894889"
//               strokeWidth="10"
//               strokeDasharray={circumference}
//               strokeDashoffset={strokeDashoffset}
//               transform={`rotate(-90 ${radius} ${radius})`}
//               strokeLinecap="round"
//             />
//           </svg>
//           <div className="mt-4 font-bold text-2xl">{formatTime(timeLeft)}</div>
//         </>
//       )}
//       <div className="flex space-x-4 mt-4">
//         <button
//           className="px-4 py-2 rounded text-white"
//           onClick={handleStartPause}
//           disabled={duration === 0}
//         >
//           {!showTimer ? "Démarrer" : isRunning ? "Pause" : "Reprendre"}
//         </button>
//         {showTimer && (
//           <button
//             className="px-4 py-2 rounded text-white"
//             onClick={handleDelete}
//           >
//             Supprimer
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CircularTimer;
