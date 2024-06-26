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
    resetAndStartTimer,
    updateTimerName,
    updateTimer,
    shouldPlayAlarm,
    setShouldPlayAlarm,
  } = useTimeStore();

  const timer = useTimeStore((state) => state.timers.find((t) => t.id === id));

  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [initialTime, setInitialTime] = useState<number>(0);
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

  useEffect(() => {
    if (shouldPlayAlarm) {
      if (audioRef.current) {
        audioRef.current.play().catch((error) => {
          console.error("Erreur de lecture de l'alarme:", error);
        });
      }
      setShouldPlayAlarm(false);
    }
  }, [shouldPlayAlarm, setShouldPlayAlarm]);

  const playAlarm = useCallback(() => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((error) =>
          console.error("Erreur de lecture de l'alarme:", error)
        );
    }
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (timer?.isRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = Math.max(prevTime - 1000, 0);
          if (newTime === 0) {
            stopTimer(timer.id);
            playAlarm();
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [timer, timeLeft, stopTimer, playAlarm]);

  useEffect(() => {
    if (timer) {
      const initialTimeInMilliseconds =
        (parseInt(timer.hours) * 3600 +
          parseInt(timer.minutes) * 60 +
          parseInt(timer.seconds)) *
        1000;
      setTimeLeft(timer.timeLeft);
      setInitialTime(initialTimeInMilliseconds);
      setTimerName(timer.name || "");
    }
  }, [timer]);

  const handleStartPause = useCallback(() => {
    if (!timer) return;

    if (timer.isRunning) {
      stopTimer(id);
      updateTimer(id, { timeLeft });
    } else {
      if (timeLeft === 0) {
        const initialTimeInMilliseconds =
          (parseInt(timer.hours) * 3600 +
            parseInt(timer.minutes) * 60 +
            parseInt(timer.seconds)) *
          1000;
        setTimeLeft(initialTimeInMilliseconds);
        resetAndStartTimer(id);
        setShouldPlayAlarm(false);
      } else {
        startTimer(id);
      }
    }
  }, [
    timer,
    timeLeft,
    id,
    startTimer,
    stopTimer,
    updateTimer,
    resetAndStartTimer,
    setShouldPlayAlarm,
  ]);

  const radius = size / 2;
  const circumference = 2 * Math.PI * (radius - 10);
  const strokeDashoffset = circumference * (1 - timeLeft / (initialTime || 1));

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
