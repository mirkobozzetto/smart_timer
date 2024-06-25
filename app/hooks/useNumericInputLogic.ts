import { useCallback, useEffect, useState } from "react";
import { useTimeStore } from "../store/timeStore";
import { TimeDirection, TimeUnit } from "../types/types";

interface UseNumericInputLogicProps {
  min: number;
  max: number;
  label: TimeUnit;
  onNavigate: (direction: TimeDirection) => void;
}

/**
 *
 * @param {UseNumericInputLogicProps} param0
 * @returns {React.Dispatch<React.SetStateAction<string>>}
 * @description
 * This function returns an object with the following properties:
 * - value: The current value of the input field.
 * - handleKeyDown: A function that handles the keydown event of the input field.
 * - handleChange: A function that handles the change event of the input field.
 * It also updates the value state and calls the setTime function with the new value.
 */
const useNumericInputLogic = ({
  min,
  max,
  label,
  onNavigate,
}: UseNumericInputLogicProps) => {
  const { [label]: storeValue, setTime } = useTimeStore();
  const [value, setValue] = useState(storeValue || "00");

  useEffect(() => {
    setValue(storeValue || "00");
  }, [storeValue]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (/^[0-9]$/.test(e.key)) {
        e.preventDefault();
        let newValue: string;

        /**
         * If the field is empty, start a new input
         */
        if (value === "00") {
          newValue = e.key;
        } else if (value.length === 2 && value !== "00") {
          newValue = value.slice(-1) + e.key;
        } else {
          newValue = value + e.key;
        }

        /**
         * Check if the new value is within the min and max range
         */
        const numericValue = parseInt(newValue);
        if (numericValue >= min && numericValue <= max) {
          newValue = newValue.padStart(2, "0");
          setValue(newValue);
          setTime(label, newValue);
        } else {
          /**
           * If the value is out of range, keep only the last digit input
           */
          newValue = e.key.padStart(2, "0");
          setValue(newValue);
          setTime(label, newValue);
        }
      } else {
        switch (e.key) {
          case "ArrowLeft":
            if (e.currentTarget.selectionStart === 0) {
              e.preventDefault();
              onNavigate("left");
            }
            break;
          case "ArrowRight":
            if (e.currentTarget.selectionEnd === e.currentTarget.value.length) {
              e.preventDefault();
              onNavigate("right");
            }
            break;
          case "ArrowUp":
            e.preventDefault();
            const incrementedValue = Math.min(parseInt(value) + 1, max)
              .toString()
              .padStart(2, "0");
            setValue(incrementedValue);
            setTime(label, incrementedValue);
            break;
          case "ArrowDown":
            e.preventDefault();
            const decrementedValue = Math.max(parseInt(value) - 1, min)
              .toString()
              .padStart(2, "0");
            setValue(decrementedValue);
            setTime(label, decrementedValue);
            break;
        }
      }
    },
    [min, max, value, onNavigate, label, setTime]
  );

  /**
   * Handle the change event of the input field
   * @param e The event object
   * @returns void
   * @description
   * This function is called when the input field value changes.
   * It updates the value state and calls the setTime function with the new value.
   */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value.replace(/\D/g, "");
      if (
        newValue === "" ||
        (parseInt(newValue) >= min && parseInt(newValue) <= max)
      ) {
        const paddedValue = newValue.padStart(2, "0");
        setValue(paddedValue);
        setTime(label, paddedValue);
      }
    },
    [min, max, label, setTime]
  );

  return { value, handleKeyDown, handleChange };
};

export default useNumericInputLogic;
