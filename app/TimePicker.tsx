import React, { useState } from "react";

interface NumericInputProps {
  min: number;
  max: number;
  label: string;
}

const NumericInput = ({ min, max, label }: NumericInputProps) => {
  const [value, setValue] = useState("00");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const lastDigit = inputValue[inputValue.length - 1];
    const tentativeValue = value[1] + lastDigit;
    const numericValue = parseInt(tentativeValue, 10);

    if (numericValue >= min && numericValue <= max) {
      setValue(tentativeValue);
    } else {
      setValue("0" + lastDigit);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <label className="mb-1 font-medium text-sm">{label}</label>
      <input
        type="text"
        className="w-20 font-bold text-center text-lg cursor-default caret-transparent outline-none"
        value={value}
        onChange={handleChange}
        maxLength={3}
        onKeyDown={(e) => {
          if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
            e.preventDefault();
          }
        }}
      />
    </div>
  );
};

const TimePicker = () => {
  return (
    <div className="flex space-x-4">
      <NumericInput min={0} max={23} label="Hours" />
      <NumericInput min={0} max={59} label="Minutes" />
      <NumericInput min={0} max={59} label="Seconds" />
    </div>
  );
};

export default TimePicker;
