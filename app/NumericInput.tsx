"use client";

import clsx from "clsx";
import React, { useRef, useState } from "react";

interface NumericInputProps {
  min: number;
  max: number;
  label: string;
  onNavigate: (direction: "left" | "right") => void;
}

const NumericInput = ({ min, max, label, onNavigate }: NumericInputProps) => {
  const [value, setValue] = useState("00");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleNavigate = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowLeft" && inputRef.current?.selectionStart === 0) {
      e.preventDefault();
      onNavigate("left");
    } else if (
      e.key === "ArrowRight" &&
      inputRef.current?.selectionEnd === value.length
    ) {
      e.preventDefault();
      onNavigate("right");
    } else if (
      !/[0-9]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight"
    ) {
      e.preventDefault();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <label className="mb-1 font-medium text-sm">{label}</label>
      <input
        ref={inputRef}
        type="text"
        className={clsx(
          "w-20 font-bold text-center text-lg cursor-default caret-transparent outline-none rounded",
          "transition-colors duration-200 ease-in-out",
          {
            "bg-[#894889] text-white": isFocused,
          }
        )}
        value={value}
        onChange={handleChange}
        maxLength={3}
        onKeyDown={(e) => {
          if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
            e.preventDefault();
          }
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};

export default NumericInput;
