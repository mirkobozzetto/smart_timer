"use client";

import NumericInput from "./NumericInput";
import TimerButtons from "./components/TimerButtons";
import useTimePickerNavigation from "./hooks/useTimePickerNavigation";

interface TimePickerProps {
  startTimer: () => void;
  stopTimer: () => void;
  isRunning: boolean;
}

const TimePicker = ({ startTimer, stopTimer, isRunning }: TimePickerProps) => {
  const { hoursRef, minutesRef, secondsRef, handleNavigate } =
    useTimePickerNavigation();

  return (
    <div className="flex flex-col">
      <div className="flex">
        <NumericInput
          min={0}
          max={23}
          label="h"
          onNavigate={(direction) => handleNavigate("hours", direction)}
          ref={hoursRef}
          suffix=":"
        />
        <NumericInput
          min={0}
          max={59}
          label="min"
          onNavigate={(direction) => handleNavigate("minutes", direction)}
          ref={minutesRef}
          suffix=":"
        />
        <NumericInput
          min={0}
          max={59}
          label="sec"
          onNavigate={(direction) => handleNavigate("seconds", direction)}
          ref={secondsRef}
        />
      </div>
      <TimerButtons
        onStart={startTimer}
        onStop={stopTimer}
        isRunning={isRunning}
        hoursRef={hoursRef}
        minutesRef={minutesRef}
        secondsRef={secondsRef}
      />
    </div>
  );
};

export default TimePicker;
