"use client";
import { useCallback, useRef } from "react";
import useTimePickerNavigation from "../hooks/useTimePickerNavigation";
import { useTimeStore } from "../store/timeStore";
import { TimeDirection } from "../types/types";
import NumericInput from "./NumericInput";
import TimerButtons from "./TimerButtons";

const TimePicker = () => {
  const { hoursRef, minutesRef, secondsRef, handleNavigate } =
    useTimePickerNavigation();
  const { createTimer, inputHours, inputMinutes, inputSeconds } =
    useTimeStore();

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // const handleEnterPress = useCallback(() => {
  //   if (timerRef.current) {
  //     clearTimeout(timerRef.current);
  //   }

  //   timerRef.current = setTimeout(() => {
  //     const totalSeconds =
  //       parseInt(inputHours) * 3600 +
  //       parseInt(inputMinutes) * 60 +
  //       parseInt(inputSeconds);

  //     if (totalSeconds > 0) {
  //       createTimer(Date.now().toString());
  //     } else {
  //       console.log("Timer value must be greater than 0");
  //     }
  //   }, 300); // 300ms de délai pour que le timer soit créé et démarré
  // }, [inputHours, inputMinutes, inputSeconds, createTimer]);

  const handleEnterPress = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      const totalSeconds =
        parseInt(inputHours) * 3600 +
        parseInt(inputMinutes) * 60 +
        parseInt(inputSeconds);

      if (totalSeconds > 0) {
        // createTimer(Date.now().toString());
        createTimer(performance.now().toString());
      } else {
        console.log("Timer value must be greater than 0");
      }
    }, 300);
  }, [inputHours, inputMinutes, inputSeconds, createTimer]);

  return (
    <div className="flex flex-col">
      <div className="flex">
        <NumericInput
          min={0}
          max={23}
          label="h"
          onNavigate={(direction: TimeDirection) =>
            handleNavigate("hours", direction)
          }
          ref={hoursRef}
          suffix=":"
          onEnterPress={handleEnterPress}
        />
        <NumericInput
          min={0}
          max={59}
          label="min"
          onNavigate={(direction: TimeDirection) =>
            handleNavigate("minutes", direction)
          }
          ref={minutesRef}
          suffix=":"
          onEnterPress={handleEnterPress}
        />
        <NumericInput
          min={0}
          max={59}
          label="sec"
          onNavigate={(direction: TimeDirection) =>
            handleNavigate("seconds", direction)
          }
          ref={secondsRef}
          onEnterPress={handleEnterPress}
        />
      </div>
      <TimerButtons />
    </div>
  );
};

export default TimePicker;
