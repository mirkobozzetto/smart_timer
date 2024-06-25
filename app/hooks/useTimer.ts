import { useCallback, useEffect, useState } from "react";

interface UseTimerProps {
  hoursRef: React.RefObject<HTMLInputElement>;
  minutesRef: React.RefObject<HTMLInputElement>;
  secondsRef: React.RefObject<HTMLInputElement>;
}

const useTimer = ({ hoursRef, minutesRef, secondsRef }: UseTimerProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const calculateTotalSeconds = () => {
    const hours = parseInt(hoursRef.current?.value || "0", 10);
    const minutes = parseInt(minutesRef.current?.value || "0", 10);
    const seconds = parseInt(secondsRef.current?.value || "0", 10);
    return hours * 3600 + minutes * 60 + seconds;
  };

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
  }, [hoursRef, minutesRef, secondsRef]);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  return { startTimer, stopTimer, timeLeft, isRunning };
};

export default useTimer;
