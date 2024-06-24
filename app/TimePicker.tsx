"use client";

import { useCallback, useRef } from "react";
import NumericInput from "./NumericInput";

const TimePicker = () => {
  const hoursRef = useRef<HTMLInputElement>(null);
  const minutesRef = useRef<HTMLInputElement>(null);
  const secondsRef = useRef<HTMLInputElement>(null);

  const handleNavigate = useCallback(
    (from: "hours" | "minutes" | "seconds", direction: "left" | "right") => {
      if (from === "hours" && direction === "right")
        minutesRef.current?.focus();
      if (from === "minutes" && direction === "left") hoursRef.current?.focus();
      if (from === "minutes" && direction === "right")
        secondsRef.current?.focus();
      if (from === "seconds" && direction === "left")
        minutesRef.current?.focus();
    },
    []
  );

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
