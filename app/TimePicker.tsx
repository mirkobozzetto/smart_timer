"use client";

import NumericInput from "./NumericInput";
import useTimePickerNavigation from "./hooks/useTimePickerNavigation";

const TimePicker = () => {
  const { hoursRef, minutesRef, secondsRef, handleNavigate } =
    useTimePickerNavigation();

  return (
    <div className="flex space-x-4">
      <NumericInput
        min={0}
        max={23}
        label="Hours"
        onNavigate={(direction) => handleNavigate("hours", direction)}
        ref={hoursRef}
      />
      <NumericInput
        min={0}
        max={59}
        label="Minutes"
        onNavigate={(direction) => handleNavigate("minutes", direction)}
        ref={minutesRef}
      />
      <NumericInput
        min={0}
        max={59}
        label="Seconds"
        onNavigate={(direction) => handleNavigate("seconds", direction)}
        ref={secondsRef}
      />
    </div>
  );
};

export default TimePicker;
