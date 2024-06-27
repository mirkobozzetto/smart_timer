import { useTimeStore } from "../store/timeStore";
import CircularTimer from "./CircularTimer";

const TimerContainer = () => {
  const timers = useTimeStore((state) => state.timers);

  return (
    <div className="flex flex-wrap justify-center items-center">
      {/* {timer && <CircularTimer />} */}
      {timers.map((timer) => (
        <CircularTimer key={timer.id} timers={timers} id={timer.id} />
      ))}
    </div>
  );
};

export default TimerContainer;
