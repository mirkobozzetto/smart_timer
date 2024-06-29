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
  const { startTimer, stopTimer, deleteTimer, tick, createTimer } =
    useTimeStore();

  const timer = useTimeStore((state) => state.timers.find((t) => t.id === id));

  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [initialTime, setInitialTime] = useState<number>(0);
  const initializedRef = useRef(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/bell_ring.mp3");
  }, []);

  const playAlarm = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .catch((error) => console.error("Playback failed", error));
    }
  }, []);

  const stopAlarm = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    if (timer && !initializedRef.current) {
      const totalTime = timer.timeLeft * 100;
      setTimeLeft(totalTime);
      setInitialTime(totalTime);

      initializedRef.current = true;
    }
  }, [timer]);

  // useEffect(() => {
  //   if (timer) {
  //     setTimeout(() => {
  //       setTimeLeft(timer.timeLeft * 100);
  //       setInitialTime(timer.timeLeft * 100);
  //     }, 0);
  //   }
  // }, [timer]);

  const handleCreateTimer = useCallback(
    (id: string) => {
      createTimer(id);
    },
    [createTimer]
  );

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (timer?.isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;

          if (newTime <= 0) {
            if (interval) clearInterval(interval);
            stopTimer(timer.id);
            playAlarm();
            return 0;
          }
          return newTime;
        });
      }, 10);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer?.isRunning, stopTimer, timer?.id, playAlarm]);

  const handleStartPause = useCallback(() => {
    if (timer?.isRunning) {
      stopTimer(id);
    } else {
      startTimer(id);
    }
  }, [timer?.isRunning, id, startTimer, stopTimer]);

  const handleDelete = useCallback(() => {
    deleteTimer(id);
  }, [id, deleteTimer]);

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
            <circle cx={radius} cy={radius} r={radius - 12} />
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
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${radius} ${radius})`}
          strokeLinecap="round"
        />
        <RandomGiphyImage size={size} gifKeywords={gifKeywords} />
        {/* <text
          x={radius}
          y={radius}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={size / 4}
          fill="white"
        >
          hello
        </text> */}
      </svg>

      <div className="mt-4 font-thin text-2xl text-white">
        {formatTime(timeLeft)}
      </div>
      <div className="flex justify-between mt-4 w-full">
        <button
          className="py-2 rounded text-white"
          onClick={handleStartPause}
          disabled={timeLeft === 0}
        >
          {timer?.isRunning ? "Pause" : "Start"}
        </button>
        <button className="py-2 rounded text-white" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default memo(CircularTimer);
