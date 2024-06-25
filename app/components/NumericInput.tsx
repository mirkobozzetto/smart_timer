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
}

const NumericInput = forwardRef<HTMLInputElement, NumericInputProps>(
  ({ min, max, label, suffix = "", onNavigate }, ref) => {
    const timeUnit = shortLabelToTimeUnit[label as ShortLabel];
    const { value, handleKeyDown, handleChange } = useNumericInputLogic({
      min,
      max,
      label: timeUnit,
      onNavigate,
    });

    const { handleFocus, handleBlur, isFocused } = useFocusClass(
      ref as React.RefObject<HTMLInputElement>,
      "bg-[#894889] text-white"
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
              "w-24 font-bold text-center text-6xl cursor-default caret-transparent outline-none rounded text-gray-100 bg-[#1E1E1E] focus:bg-[#894889] focus:text-white",
              {
                "bg-[#894889] text-white": isFocused,
              }
            )}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            maxLength={2}
            onFocus={(e) => {
              handleFocus();
              e.target.select();
            }}
            onBlur={handleBlur}
            onSelect={(e) => e.currentTarget.select()}
          />
          <span className="ml-1 text-4xl text-gray-100">{suffix}</span>
        </div>
      </div>
    );
  }
);

NumericInput.displayName = "NumericInput";

export default React.memo(NumericInput);

// import clsx from "clsx";
// import React, { forwardRef, useRef } from "react";
// import useFocusClass from "../hooks/useFocusClass";
// import useNumericInputLogic from "../hooks/useNumericInputLogic";

// interface NumericInputProps {
//   min: number;
//   max: number;
//   label: string;
//   suffix?: string;
//   onNavigate: (direction: "left" | "right") => void;
// }

// const NumericInput = forwardRef<HTMLInputElement, NumericInputProps>(
//   ({ min, max, label, suffix = "", onNavigate }, ref) => {
//     const isFocused = useRef(false);

//     const { value, handleKeyDown, handleChange } = useNumericInputLogic({
//       min,
//       max,
//       label,
//       onNavigate,
//     });

//     const { handleFocus, handleBlur } = useFocusClass(
//       ref as React.RefObject<HTMLInputElement>,
//       "bg-[#894889] text-white"
//     );

//     return (
//       <div className="flex flex-col items-center">
//         <label className="items-center mb-1 font-medium text-gray-200 text-sm">
//           {label}
//         </label>
//         <div className="flex items-center rounded-lg">
//           <input
//             ref={ref}
//             type="text"
//             className={clsx(
//               "w-24 font-bold text-center text-6xl cursor-default caret-transparent outline-none rounded text-gray-100 bg-[#1E1E1E] focus:bg-[#894889] focus:text-white",
//               {
//                 "bg-[#894889] text-white": isFocused.current,
//               }
//             )}
//             value={value}
//             onChange={handleChange}
//             onKeyDown={handleKeyDown}
//             maxLength={3}
//             onFocus={() => {
//               isFocused.current = true;
//               handleFocus();
//             }}
//             onBlur={() => {
//               isFocused.current = false;
//               handleBlur();
//             }}
//             // onSelect
//           />
//           <span className="ml-1 text-4xl text-gray-100">{suffix}</span>
//         </div>
//       </div>
//     );
//   }
// );

// NumericInput.displayName = "NumericInput";

// export default React.memo(NumericInput);
