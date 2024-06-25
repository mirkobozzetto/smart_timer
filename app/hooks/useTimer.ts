import { useCallback, useEffect, useState } from "react";

interface UseTimerProps {
  hoursRef: React.RefObject<HTMLInputElement>;
  minutesRef: React.RefObject<HTMLInputElement>;
  secondsRef: React.RefObject<HTMLInputElement>;
  initialHours: number;
  initialMinutes: number;
  initialSeconds: number;
}

/**
 *
 * @param param0
 * @returns
 * @description
 * This function returns an object with the following properties:
 * - startTimer: A function that starts the timer.
 * - stopTimer: A function that stops the timer.
 * - timeLeft: The time left in seconds.
 * - isRunning: A boolean indicating whether the timer is running.
 * It also updates the timeLeft state and calls the tick function every 1000 milliseconds.
 */
const useTimer = ({
  hoursRef,
  minutesRef,
  secondsRef,
  initialHours,
  initialMinutes,
  initialSeconds,
}: UseTimerProps) => {
  const [hours, setHours] = useState(initialHours);
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const calculateTotalSeconds = useCallback(() => {
    const hours = parseInt(hoursRef.current?.value || "0", 10);
    const minutes = parseInt(minutesRef.current?.value || "0", 10);
    const seconds = parseInt(secondsRef.current?.value || "0", 10);
    return hours * 3600 + minutes * 60 + seconds;
  }, [hoursRef, minutesRef, secondsRef]);

  const tick = useCallback(() => {
    setTimeLeft((prevTime) => {
      if (prevTime <= 1) {
        setIsRunning(false);
        return 0;
      }
      return prevTime - 1;
    });
  }, []);

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;
    if (isRunning && timeLeft > 0) {
      timerId = setInterval(tick, 1000);
    } else if (!isRunning) {
      clearInterval(timerId);
    }
    return () => clearInterval(timerId);
  }, [isRunning, timeLeft, tick]);

  const startTimer = useCallback(() => {
    setTimeLeft(calculateTotalSeconds());
    setIsRunning(true);
  }, [calculateTotalSeconds]);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  return { startTimer, stopTimer, timeLeft, isRunning };
};

export default useTimer;
