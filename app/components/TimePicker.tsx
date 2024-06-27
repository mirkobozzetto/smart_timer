"use client";
import useTimePickerNavigation from "../hooks/useTimePickerNavigation";
import { TimeDirection } from "../types/types";
import NumericInput from "./NumericInput";
import TimerButtons from "./TimerButtons";
import TimerContainer from "./TimerContainer";

const TimePicker = () => {
  const { hoursRef, minutesRef, secondsRef, handleNavigate } =
    useTimePickerNavigation();

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
        />
        <NumericInput
          min={0}
          max={59}
          label="sec"
          onNavigate={(direction: TimeDirection) =>
            handleNavigate("seconds", direction)
          }
          ref={secondsRef}
        />
      </div>
      <TimerButtons />
      <TimerContainer />
    </div>
  );
};

export default TimePicker;
