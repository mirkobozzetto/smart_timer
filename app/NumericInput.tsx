import clsx from "clsx";
import React, { forwardRef, useCallback, useRef } from "react";
import useFocusClass from "./hooks/useFocusClass";
import useHandleKeyDown from "./hooks/useHandleKeyDown";
import useIncrementDecrement from "./hooks/useIncrementDecrement";

interface NumericInputProps {
  min: number;
  max: number;
  label: string;
  suffix?: string;
  onNavigate: (direction: "left" | "right") => void;
}

const NumericInput = forwardRef<HTMLInputElement, NumericInputProps>(
  ({ min, max, label, suffix = "", onNavigate }, ref) => {
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

        console.log("Handle Change:", {
          inputValue,
          tentativeValue,
          numericValue,
        });

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
        <label className="items-center mb-1 font-medium text-gray-200 text-sm">
          {label}
        </label>
        <div className="flex items-center rounded-lg">
          <input
            ref={ref}
            type="text"
            className={clsx(
              "w-20 font-bold text-center text-6xl cursor-default caret-transparent outline-none rounded text-gray-100 bg-[#1E1E1E] focus:bg-[#894889] focus:text-white",
              {
                "bg-[#894889] text-white": isFocused.current,
              }
            )}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            maxLength={3}
            onFocus={() => {
              isFocused.current = true;
              handleFocus();
            }}
            onBlur={() => {
              isFocused.current = false;
              handleBlur();
            }}
          />
          <span className="ml-1 text-4xl text-gray-100">{suffix}</span>
        </div>
      </div>
    );
  }
);

NumericInput.displayName = "NumericInput";

export default React.memo(NumericInput);
