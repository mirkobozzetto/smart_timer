import { useEffect, useState } from "react";
import { useTimeStore } from "../store/timeStore";

interface CircularTimerProps {
  size?: number;
}

const CircularTimer = ({ size = 200 }: CircularTimerProps) => {
  const {
    // hours,
    // minutes,
    // seconds,
    isRunning,
    startTimer,
    stopTimer,
    // resetTimer,
    resetAll,
    timeLeft,
    setTimeLeft,
  } = useTimeStore();
  const [localTimeLeft, setLocalTimeLeft] = useState(timeLeft * 100);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setLocalTimeLeft(timeLeft * 100);
  }, [timeLeft]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && localTimeLeft > 0) {
      interval = setInterval(() => {
        setLocalTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            stopTimer();
            setIsVisible(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning, localTimeLeft, stopTimer]);

  const radius = size / 2;
  const circumference = 2 * Math.PI * (radius - 10);
  const strokeDashoffset =
    circumference * (1 - localTimeLeft / (timeLeft * 100));

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleStartPause = () => {
    if (isRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  };

  const handleDelete = () => {
    stopTimer();
    resetAll();
    setLocalTimeLeft(0);
    setIsVisible(false);
  };

  return isVisible ? (
    <div className="flex flex-col items-center border-2 border-white/20 p-5 rounded-lg">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={radius}
          cy={radius}
          r={radius - 10}
          fill="none"
          stroke="#4B4B4B"
          strokeWidth="2"
        />
        <circle
          cx={radius}
          cy={radius}
          r={radius - 10}
          fill="none"
          stroke="#894889"
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${radius} ${radius})`}
          strokeLinecap="round"
        />
      </svg>
      <div className="mt-4 font-thin text-2xl text-white">
        {formatTime(localTimeLeft)}
      </div>
      <div className="flex space-x-4 mt-4">
        <button
          className="px-4 py-2 rounded text-white"
          onClick={handleStartPause}
          disabled={timeLeft === 0}
        >
          {isRunning ? "Pause" : "Démarrer"}
        </button>
        <button className="px-4 py-2 rounded text-white" onClick={handleDelete}>
          Supprimer
        </button>
      </div>
    </div>
  ) : null;
};

export default CircularTimer;

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
//               strokeWidth="20"
//             />
//             <circle
//               cx={radius}
//               cy={radius}
//               r={radius - 10}
//               fill="none"
//               stroke="#894889"
//               strokeWidth="20"
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
