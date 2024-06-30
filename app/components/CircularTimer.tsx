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
    // tick,
    createTimer,
    resetAndStartTimer,
    updateTimerName,
    updateTimer,
  } = useTimeStore();

  const timer = useTimeStore((state) => state.timers.find((t) => t.id === id));

  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [initialTime, setInitialTime] = useState<number>(0);
  const [timerName, setTimerName] = useState<string>("");

  const initializedRef = useRef(false);

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

  // useEffect(() => {
  //   if (timer && !initializedRef.current) {
  //     const totalTime = timer.timeLeft * 100;
  //     setTimeLeft(totalTime);
  //     setInitialTime(totalTime);
  //     setTimerName(timer.name || "");
  //     initializedRef.current = true;
  //   }
  // }, [timer]);

  useEffect(() => {
    if (timer) {
      const initialTimeInSeconds =
        parseInt(timer.hours) * 3600 +
        parseInt(timer.minutes) * 60 +
        parseInt(timer.seconds);
      setTimeLeft(timer.timeLeft * 100);
      setInitialTime(initialTimeInSeconds * 100);
      setTimerName(timer.name || "");
    }
  }, [timer]);

  const handleCreateTimer = useCallback(
    (id: string) => {
      createTimer(id);
    },
    [createTimer]
  );

  useEffect(() => {
    let animationFrameId: number | null = null;
    let lastUpdateTime: number | null = null;

    const updateTimer = (currentTime: number) => {
      if (!timer) return;

      if (lastUpdateTime === null) {
        lastUpdateTime = currentTime;
      }

      const deltaTime = currentTime - lastUpdateTime;

      if (deltaTime >= 10) {
        // Mise à jour toutes les 10ms
        setTimeLeft((prevTime) => {
          const newTime = Math.max(prevTime - 1, 0); // Décrémente de 1 (1/100 de seconde)
          if (newTime === 0 && prevTime !== 0) {
            stopTimer(timer.id);
            playAlarm();
            return initialTime; // Réinitialise à la valeur initiale
          }
          return newTime;
        });
        lastUpdateTime = currentTime;
      }

      if (timer.isRunning) {
        animationFrameId = requestAnimationFrame(updateTimer);
      }
    };

    if (timer?.isRunning) {
      animationFrameId = requestAnimationFrame(updateTimer);
    }

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [timer, stopTimer, playAlarm, initialTime]);

  resetAndStartTimer: (id: string) =>
    // @ts-ignore
    set((state) => ({
      // @ts-ignore
      timers: state.timers.map((timer) =>
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

  const handleStartPause = useCallback(() => {
    if (!timer) return;

    if (timer.isRunning) {
      stopTimer(id);
      updateTimer(id, { timeLeft: Math.ceil(timeLeft / 100) });
    } else {
      if (timeLeft === 0) {
        // Réinitialiser le timer à sa valeur initiale
        setTimeLeft(initialTime);
      }
      startTimer(id);
    }
  }, [timer, timeLeft, id, startTimer, stopTimer, updateTimer, initialTime]);

  const radius = size / 2;
  const circumference = 2 * Math.PI * (radius - 10);
  const strokeDashoffset = circumference * (1 - timeLeft / (initialTime || 1));

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
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
        <button
          className="py-2 rounded text-white"
          onClick={handleStartPause}
          // disabled={timeLeft === 0}
        >
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
