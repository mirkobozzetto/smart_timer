import { useEffect, useState } from "react";
import { useTimeStore, useTimerTick } from "../store/timeStore";
import CircularTimer from "./CircularTimer";

const TimerContainer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const timers = useTimeStore((state) => state.timers);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useTimerTick();

  if (isLoading) {
    return null; // ou un composant de chargement
  }

  return (
    <div className="flex flex-wrap justify-center items-center gap-x-5 w-[75%]">
      {timers.map((timer) => (
        <CircularTimer key={timer.id} timers={timers} id={timer.id} />
      ))}
    </div>
  );
};

export default TimerContainer;
