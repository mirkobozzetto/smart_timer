import { useCallback, useState } from "react";

const useNumericInputValue = (
  min: number,
  max: number,
  initialValue: string
) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      const lastDigit = inputValue[inputValue.length - 1];
      const tentativeValue = value[1] + lastDigit;
      const numericValue = parseInt(tentativeValue, 10);

      if (numericValue >= min && numericValue <= max) {
        setValue(tentativeValue);
      } else {
        setValue("0" + lastDigit);
      }
      event.target.value = tentativeValue;
    },
    [min, max, value]
  );

  return {
    value,
    handleChange,
  };
};

export default useNumericInputValue;
