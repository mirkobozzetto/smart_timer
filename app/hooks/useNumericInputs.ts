import { useCallback } from "react";
import { useTimeStore } from "../store/timeStore";
import useHandleKeyDown from "./useHandleKeyDown";

interface UseNumericInputLogicProps {
  min: number;
  max: number;
  label: string;
  onNavigate: (direction: "left" | "right") => void;
}

const useNumericInputLogic = ({
  min,
  max,
  label,
  onNavigate,
}: UseNumericInputLogicProps) => {
  const value = useTimeStore(
    useCallback(
      (state) => {
        switch (label) {
          case "h":
            return state.hours;
          case "min":
            return state.minutes;
          case "sec":
            return state.seconds;
          default:
            return "00";
        }
      },
      [label]
    )
  );

  const updateValue = useTimeStore(
    useCallback(
      (state) => {
        switch (label) {
          case "h":
            return state.setHours;
          case "min":
            return state.setMinutes;
          case "sec":
            return state.setSeconds;
          default:
            return () => {};
        }
      },
      [label]
    )
  );

  const increment = useCallback(() => {
    const numericValue = parseInt(value, 10);
    if (numericValue < max) {
      const newValue = (numericValue + 1).toString().padStart(2, "0");
      updateValue(newValue);
    }
  }, [value, updateValue, max]);

  const decrement = useCallback(() => {
    const numericValue = parseInt(value, 10);
    if (numericValue > min) {
      const newValue = (numericValue - 1).toString().padStart(2, "0");
      updateValue(newValue);
    }
  }, [value, updateValue, min]);

  const handleKeyDown = useHandleKeyDown(onNavigate, increment, decrement);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      const lastDigit = inputValue[inputValue.length - 1];
      const tentativeValue = value[1] + lastDigit;
      const numericValue = parseInt(tentativeValue, 10);

      if (numericValue >= min && numericValue <= max) {
        updateValue(tentativeValue);
      } else {
        updateValue("0" + lastDigit);
      }
    },
    [min, max, value, updateValue]
  );

  return {
    value,
    updateValue,
    increment,
    decrement,
    handleKeyDown,
    handleChange,
  };
};

export default useNumericInputLogic;
