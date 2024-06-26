import clsx from "clsx";
import React, { forwardRef } from "react";
import useFocusClass from "../hooks/useFocusClass";
import useNumericInputLogic from "../hooks/useNumericInputLogic";

import {
  ShortLabel,
  shortLabelToTimeUnit,
  TimeDirection,
} from "../types/types";

interface NumericInputProps {
  min: number;
  max: number;
  label: ShortLabel;
  suffix?: string;
  onNavigate: (direction: TimeDirection) => void;
  onEnterPress?: () => void;
}

/**
 *
 * @param param0
 * @returns
 * @description
 * NumericInput component
 */
const NumericInput = forwardRef<HTMLInputElement, NumericInputProps>(
  ({ min, max, label, suffix = "", onNavigate, onEnterPress }, ref) => {
    /**
     * Convert the label to the corresponding time unit
     * @param label The label of the input field
     * @returns The time unit corresponding to the label
     * @description
     * This function converts the label to the corresponding time unit.
     */
    const timeUnit = shortLabelToTimeUnit[label as ShortLabel];

    const { value, handleKeyDown, handleChange } = useNumericInputLogic({
      min,
      max,
      label: timeUnit,
      onNavigate,
      onEnterPress,
    });

    /**
     * Handle the focus and blur events of the input
     * @param ref The ref of the input
     * @returns void
     * @description
     * This function is called when the input is focused or blurred.
     * It updates the isFocused state and adds or removes the appropriate classes from the input element.
     */
    const { handleFocus, handleBlur, isFocused } = useFocusClass(
      ref as React.RefObject<HTMLInputElement>,
      "bg-[#894889]/70 text-white"
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
            inputMode="numeric"
            pattern="[0-9]*"
            className={clsx(
              "w-20 font-bold text-center text-6xl cursor-default caret-transparent outline-none rounded text-gray-100 bg-white/5",
              "selection:bg-transparent  focus:bg-[#894889]/70 focus:text-white hover:bg-[#894889]/30 hover:text-white",
              {
                "bg-[#894889] text-white": isFocused,
              }
            )}
            value={value}
            onChange={handleChange}
            // onKeyDown={handleKeyDown}
            onKeyDown={(e) => {
              handleKeyDown(e);
              if (e.key === "Enter" && onEnterPress) {
                onEnterPress();
              }
            }}
            maxLength={2}
            onFocus={(e) => {
              handleFocus();
              e.target.select();
            }}
            onBlur={handleBlur}
            onSelect={(e) => e.currentTarget.select()}
            onContextMenu={(e) => e.preventDefault()}
            aria-label={`Enter ${label} value`}
          />
          <span className="text-4xl text-gray-100 cursor-default">
            {suffix}
          </span>
        </div>
      </div>
    );
  }
);

NumericInput.displayName = "NumericInput";

export default React.memo(NumericInput);
