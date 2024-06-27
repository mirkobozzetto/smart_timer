import { useTimeStore } from "../store/timeStore";
import CircularTimer from "./CircularTimer";

const TimerContainer = () => {
  const timer = useTimeStore((state) => state.timer);

  return <div>{timer && <CircularTimer />}</div>;
};

export default TimerContainer;
