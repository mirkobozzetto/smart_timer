import { v4 as uuidv4 } from "uuid";
import { useTimeStore } from "../store/timeStore";

const TimerButtons = () => {
  const { inputHours, inputMinutes, inputSeconds, createTimer } =
    useTimeStore();

  const handleCreateTimer = () => {
    const id = uuidv4();
    createTimer(id);
  };

  const isTimerSet =
    parseInt(inputHours) > 0 ||
    parseInt(inputMinutes) > 0 ||
    parseInt(inputSeconds) > 0;

  return (
    <div className="mb-1 text-center">
      <button
        onClick={handleCreateTimer}
        disabled={!isTimerSet}
        className="m-2 px-4 py-2 rounded font-extrabold text-3xl text-white/95"
      >
        Create Timer
      </button>
    </div>
  );
};

export default TimerButtons;
