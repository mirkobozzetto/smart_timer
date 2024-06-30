import { memo, useCallback, useEffect, useRef, useState } from "react";
import { gifKeywords } from "../keywords";
import { Timer, useTimeStore } from "../store/timeStore";
import RandomGiphyImage from "./RandomGiphyImage";

interface CircularTimerProps {
  id: string;
  size?: number;
  timers: Timer[];
}

const CircularTimer = ({ id, size = 200 }: CircularTimerProps) => {
  const {
    startTimer,
    stopTimer,
    deleteTimer,
    createTimer,
    resetAndStartTimer,
    updateTimerName,
    updateTimer,
  } = useTimeStore();

  const timer = useTimeStore((state) => state.timers.find((t) => t.id === id));

  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [initialTime, setInitialTime] = useState<number>(0);
  const timeLeftRef = useRef<number>(0);
  const initialTimeRef = useRef<number>(0);

  const initializedRef = useRef(false);
  const [timerName, setTimerName] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleDelete = useCallback(() => {
    deleteTimer(id);
  }, [id, deleteTimer]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value.slice(0, 20);
    setTimerName(newName);
    updateTimerName(id, newName);
  };

  useEffect(() => {
    audioRef.current = new Audio("/clockalarm.mp3");
  }, []);

  const playAlarm = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .catch((error) => console.error("Playback failed", error));
    }
  }, []);

  const handleCreateTimer = useCallback(
    (id: string) => {
      createTimer(id);
    },
    [createTimer]
  );

  useEffect(() => {
    // let animationFrameId: number | null = null;
    let animationFrameId: number;
    let lastUpdateTime: number | null = null;

    // const updateTimer = (currentTime: number) => {
    //   if (!timer || !timer.isRunning) return;

    //   if (lastUpdateTime === null) {
    //     lastUpdateTime = currentTime;
    //     animationFrameId = requestAnimationFrame(updateTimer);
    //     return;
    //   }

    //   const deltaTime = currentTime - lastUpdateTime;

    //   if (deltaTime >= 1000) {
    //     setTimeLeft((prevTime) => {
    //       const newTime = Math.max(prevTime - 1000, 0);
    //       if (newTime <= 0) {
    //         stopTimer(timer.id);
    //         playAlarm();
    //         return 0;
    //       }
    //       return newTime;
    //     });
    //     lastUpdateTime = currentTime;
    //   }

    //   animationFrameId = requestAnimationFrame(updateTimer);
    // };

    // const updateTimer = (currentTime: number) => {
    //   if (!timer || !timer.isRunning) return;

    //   if (lastUpdateTime === null) {
    //     lastUpdateTime = currentTime;
    //     animationFrameId = requestAnimationFrame(updateTimer);
    //     return;
    //   }

    //   const deltaTime = currentTime - lastUpdateTime;

    //   setTimeLeft((prevTime) => {
    //     const newTime = Math.max(prevTime - deltaTime, 0);
    //     if (newTime <= 0) {
    //       stopTimer(timer.id);
    //       playAlarm();
    //       return 0;
    //     }
    //     return newTime;
    //   });

    //   lastUpdateTime = currentTime;
    //   animationFrameId = requestAnimationFrame(updateTimer);
    // };

    const updateTimer = (currentTime: number) => {
      if (!timer || !timer.isRunning) return;

      if (lastUpdateTime === null) {
        lastUpdateTime = currentTime;
        animationFrameId = requestAnimationFrame(updateTimer);
        return;
      }

      if (timer?.isRunning && timeLeft > 0) {
        animationFrameId = requestAnimationFrame(updateTimer);
      }

      const deltaTime = currentTime - lastUpdateTime;

      timeLeftRef.current = Math.max(timeLeftRef.current - deltaTime, 0);
      setTimeLeft(timeLeftRef.current); // Ajoutez cette ligne pour mettre à jour l'état
      if (timeLeftRef.current <= 0) {
        stopTimer(timer.id);
        playAlarm();
      }

      lastUpdateTime = currentTime;
      animationFrameId = requestAnimationFrame(updateTimer);
    };

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [timer, stopTimer, playAlarm, timeLeft]);

  // useEffect(() => {
  //   if (timer) {
  //     const initialTimeInMilliseconds =
  //       (parseInt(timer.hours) * 3600 +
  //         parseInt(timer.minutes) * 60 +
  //         parseInt(timer.seconds)) *
  //       1000;
  //     setTimeLeft(timer.timeLeft);
  //     setInitialTime(initialTimeInMilliseconds);
  //     setTimerName(timer.name || "");
  //   }
  // }, [timer]);

  useEffect(() => {
    if (timer) {
      const initialTimeInMilliseconds =
        (parseInt(timer.hours) * 3600 +
          parseInt(timer.minutes) * 60 +
          parseInt(timer.seconds)) *
        1000;
      timeLeftRef.current = timer.timeLeft;
      initialTimeRef.current = initialTimeInMilliseconds;
      setTimeLeft(timer.timeLeft); // Ajoutez cette ligne
      setInitialTime(initialTimeInMilliseconds); // Ajoutez cette ligne
      setTimerName(timer.name || "");
    }
  }, [timer]);

  resetAndStartTimer: (id: string) =>
    // @ts-ignore
    set((state) => ({
      timers: state.timers.map((timer: Timer) =>
        timer.id === id
          ? {
              ...timer,
              timeLeft:
                parseInt(timer.hours) * 3600 +
                parseInt(timer.minutes) * 60 +
                parseInt(timer.seconds),
              isRunning: true,
            }
          : timer
      ),
    }));

  // const handleStartPause = useCallback(() => {
  //   if (!timer) return;

  //   if (timer.isRunning) {
  //     stopTimer(id);
  //     updateTimer(id, { timeLeft });
  //   } else {
  //     if (timeLeft === 0 || timeLeft === initialTime) {
  //       // Réinitialiser le timer à sa valeur initiale
  //       const initialTimeInMilliseconds =
  //         (parseInt(timer.hours) * 3600 +
  //           parseInt(timer.minutes) * 60 +
  //           parseInt(timer.seconds)) *
  //         1000;
  //       setTimeLeft(initialTimeInMilliseconds);
  //       setInitialTime(initialTimeInMilliseconds);
  //       resetAndStartTimer(id);
  //     } else {
  //       startTimer(id);
  //     }
  //   }
  // }, [
  //   timer,
  //   timeLeft,
  //   initialTime,
  //   id,
  //   startTimer,
  //   stopTimer,
  //   updateTimer,
  //   resetAndStartTimer,
  // ]);

  const handleStartPause = useCallback(() => {
    if (!timer) return;

    if (timer.isRunning) {
      stopTimer(id);
      updateTimer(id, { timeLeft: timeLeftRef.current });
    } else {
      if (
        timeLeftRef.current === 0 ||
        timeLeftRef.current === initialTimeRef.current
      ) {
        // Réinitialiser le timer à sa valeur initiale
        const initialTimeInMilliseconds =
          (parseInt(timer.hours) * 3600 +
            parseInt(timer.minutes) * 60 +
            parseInt(timer.seconds)) *
          1000;
        timeLeftRef.current = initialTimeInMilliseconds;
        initialTimeRef.current = initialTimeInMilliseconds;
        setTimeLeft(initialTimeInMilliseconds);
        setInitialTime(initialTimeInMilliseconds);
        resetAndStartTimer(id);
      } else {
        startTimer(id);
      }
    }
  }, [timer, id, startTimer, stopTimer, updateTimer, resetAndStartTimer]);

  const radius = size / 2;
  const circumference = 2 * Math.PI * (radius - 10);
  // const strokeDashoffset = circumference * (1 - timeLeft / (initialTime || 1));
  const strokeDashoffset =
    circumference * (1 - timeLeftRef.current / (initialTimeRef.current || 1));

  // const formatTime = (time: number): string => {
  //   const hours = Math.floor(time / 3600000);
  //   const minutes = Math.floor((time % 3600000) / 60000);
  //   const seconds = Math.floor((time % 60000) / 1000);
  //   return `${hours.toString().padStart(2, "0")}:${minutes
  //     .toString()
  //     .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  // };

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center border-2 border-white/20 my-5 p-10 rounded-lg min-w-56">
      <div className="flex justify-center items-center border-white/20 mb-3 border-b-2 w-full h-full">
        <input
          type="text"
          value={timerName}
          onChange={handleNameChange}
          placeholder="Let's Go Timer"
          className="bg-transparent w-3/4 text-center text-gray-300 outline-none placeholder-gray-500"
          style={{
            fontSize: `${size / 8}px`,
          }}
        />
      </div>

      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id="gradientColors" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fb23a18e">
              <animate
                attributeName="offset"
                values="0;1;0"
                dur="10s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="33%" stopColor="#db45e9ae">
              <animate
                attributeName="offset"
                values="0.33;1.33;0.33"
                dur="10s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#e945bdae">
              <animate
                attributeName="offset"
                values="0.66;1.66;0.66"
                dur="10s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
          <clipPath id="gifClip">
            <circle cx={radius} cy={radius} r={radius - 16} />
          </clipPath>
        </defs>
        <circle
          cx={radius}
          cy={radius}
          r={radius - 10}
          fill="none"
          stroke="#4B4B4B"
        />
        <circle
          cx={radius}
          cy={radius}
          r={radius - 10}
          fill="none"
          className="stroke-gradient"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${radius} ${radius})`}
          strokeLinecap="round"
        />
        <RandomGiphyImage size={size} gifKeywords={gifKeywords} />
      </svg>

      <div className="mt-4 font-thin text-2xl text-white">
        {formatTime(timeLeft)}
      </div>
      <div className="flex justify-between mt-4 w-full">
        <button className="py-2 rounded text-white" onClick={handleStartPause}>
          {timer?.isRunning ? "Pause" : timeLeft === 0 ? "Restart" : "Start"}
        </button>
        <button className="py-2 rounded text-white" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default memo(CircularTimer);
