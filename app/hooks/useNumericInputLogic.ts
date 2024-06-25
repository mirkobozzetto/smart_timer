import { useCallback, useEffect, useState } from "react";
import { useTimeStore } from "../store/timeStore";
import { TimeDirection, TimeUnit } from "../types/types";

interface UseNumericInputLogicProps {
  min: number;
  max: number;
  label: TimeUnit;
  onNavigate: (direction: TimeDirection) => void;
}

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
        const newValue = (value.slice(-1) + e.key).padStart(2, "0");
        if (parseInt(newValue) >= min && parseInt(newValue) <= max) {
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

// import { useCallback } from "react";
// import { useTimeStore } from "../store/timeStore";
// import useHandleKeyDown from "./useHandleKeyDown";

// interface UseNumericInputLogicProps {
//   min: number;
//   max: number;
//   label: string;
//   onNavigate: (direction: "left" | "right") => void;
// }

// const useNumericInputLogic = ({
//   min,
//   max,
//   label,
//   onNavigate,
// }: UseNumericInputLogicProps) => {
//   const value = useTimeStore(
//     useCallback(
//       (state) => {
//         switch (label) {
//           case "h":
//             return state.hours;
//           case "min":
//             return state.minutes;
//           case "sec":
//             return state.seconds;
//           default:
//             return "00";
//         }
//       },
//       [label]
//     )
//   );

//   const updateValue = useTimeStore(
//     useCallback(
//       (state) => {
//         switch (label) {
//           case "h":
//             return state.setHours;
//           case "min":
//             return state.setMinutes;
//           case "sec":
//             return state.setSeconds;
//           default:
//             return () => {};
//         }
//       },
//       [label]
//     )
//   );

//   const increment = useCallback(() => {
//     const numericValue = parseInt(value, 10);
//     if (numericValue < max) {
//       const newValue = (numericValue + 1).toString().padStart(2, "0");
//       updateValue(newValue);
//     }
//   }, [value, updateValue, max]);

//   const decrement = useCallback(() => {
//     const numericValue = parseInt(value, 10);
//     if (numericValue > min) {
//       const newValue = (numericValue - 1).toString().padStart(2, "0");
//       updateValue(newValue);
//     }
//   }, [value, updateValue, min]);

//   const handleKeyDown = useHandleKeyDown(onNavigate, increment, decrement);

//   const handleChange = useCallback(
//     (event: React.ChangeEvent<HTMLInputElement>) => {
//       const inputValue = event.target.value;
//       const lastDigit = inputValue[inputValue.length - 1];
//       const tentativeValue = value[1] + lastDigit;
//       const numericValue = parseInt(tentativeValue, 10);

//       if (numericValue >= min && numericValue <= max) {
//         updateValue(tentativeValue);
//       } else {
//         updateValue("0" + lastDigit);
//       }
//     },
//     [min, max, value, updateValue]
//   );

//   return {
//     value,
//     updateValue,
//     increment,
//     decrement,
//     handleKeyDown,
//     handleChange,
//   };
// };

// export default useNumericInputLogic;
