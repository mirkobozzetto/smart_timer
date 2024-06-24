"use client";

import React, { forwardRef, useCallback, useRef } from "react";
import useFocusClass from "./hooks/useFocusClass";
import useHandleKeyDown from "./hooks/useHandleKeyDown";
import useIncrementDecrement from "./hooks/useIncrementDecrement";

interface NumericInputProps {
  min: number;
  max: number;
  label: string;
  onNavigate: (direction: "left" | "right") => void;
}

const NumericInput = forwardRef<HTMLInputElement, NumericInputProps>(
  ({ min, max, label, onNavigate }, ref) => {
    const { value, increment, decrement, setValue } = useIncrementDecrement(
      min,
      max,
      "00"
    );
    const isFocused = useRef(false);

    const { handleFocus, handleBlur } = useFocusClass(
      ref as React.RefObject<HTMLInputElement>,
      "bg-[#894889] text-white"
    );
    const handleKeyDown = useHandleKeyDown(onNavigate, increment, decrement);

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
      },
      [min, max, value, setValue]
    );

    return (
      <div className="flex flex-col items-center">
        <label className="mb-1 font-medium text-sm">{label}</label>
        <input
          ref={ref}
          type="text"
          className={`w-20 font-bold text-center text-lg cursor-default caret-transparent outline-none rounded ${
            isFocused.current ? "bg-[#894889] text-white" : ""
          }`}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          maxLength={3}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    );
  }
);

NumericInput.displayName = "NumericInput";

export default React.memo(NumericInput);
