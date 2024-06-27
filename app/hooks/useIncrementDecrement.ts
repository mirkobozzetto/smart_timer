import { useCallback, useState } from "react";

type IncrementDecrementHook = (
  min: number,
  max: number,
  initialValue: string
) => {
  value: string;
  increment: () => void;
  decrement: () => void;
  setValue: (value: string) => void;
};

const useIncrementDecrement: IncrementDecrementHook = (
  min,
  max,
  initialValue
) => {
  const [value, setValue] = useState(initialValue);

  const increment = useCallback(() => {
    setValue((prevValue) => {
      let numericValue = parseInt(prevValue, 10);
      if (numericValue < max) {
        numericValue++;
        return numericValue < 10 ? `0${numericValue}` : `${numericValue}`;
      }
      return prevValue;
    });
  }, [max]);

  const decrement = useCallback(() => {
    setValue((prevValue) => {
      let numericValue = parseInt(prevValue, 10);
      if (numericValue > min) {
        numericValue--;
        return numericValue < 10 ? `0${numericValue}` : `${numericValue}`;
      }
      return prevValue;
    });
  }, [min]);

  return {
    value,
    increment,
    decrement,
    setValue,
  };
};

export default useIncrementDecrement;
