"use client";

import React, { forwardRef, useCallback, useRef } from "react";

interface NumericInputProps {
  min: number;
  max: number;
  label: string;
  onNavigate: (direction: "left" | "right") => void;
}

const NumericInput = forwardRef<HTMLInputElement, NumericInputProps>(
  ({ min, max, label, onNavigate }, ref) => {
    const value = useRef("00");
    const isFocused = useRef(false);
    const lastNavigationTime = useRef(0);

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const lastDigit = inputValue[inputValue.length - 1];
        const tentativeValue = value.current[1] + lastDigit;
        const numericValue = parseInt(tentativeValue, 10);

        if (numericValue >= min && numericValue <= max) {
          value.current = tentativeValue;
        } else {
          value.current = "0" + lastDigit;
        }
        event.target.value = value.current;
      },
      [min, max]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        const currentTime = Date.now();

        const navigate = (direction: "left" | "right") => {
          if (currentTime - lastNavigationTime.current > 400) {
            lastNavigationTime.current = currentTime;
            onNavigate(direction);
          }
        };

        switch (e.key) {
          case "ArrowLeft":
            if (input.selectionStart === 0) {
              e.preventDefault();
              navigate("left");
            }
            break;
          case "ArrowRight":
            if (input.selectionEnd === input.value.length) {
              e.preventDefault();
              navigate("right");
            }
            break;
          case "Backspace":
            break;
          default:
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
        }
      },
      [onNavigate]
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
          defaultValue={value.current}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          maxLength={3}
          onFocus={() => {
            isFocused.current = true;
            (ref as React.RefObject<HTMLInputElement>).current?.classList.add(
              "bg-[#894889]",
              "text-white"
            );
          }}
          onBlur={() => {
            isFocused.current = false;
            (
              ref as React.RefObject<HTMLInputElement>
            ).current?.classList.remove("bg-[#894889]", "text-white");
          }}
        />
      </div>
    );
  }
);

NumericInput.displayName = "NumericInput";

export default React.memo(NumericInput);
