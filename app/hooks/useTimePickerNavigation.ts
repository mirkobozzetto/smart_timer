import { useCallback, useMemo, useRef } from "react";

type TimeUnit = "hours" | "minutes" | "seconds";
type Direction = "left" | "right";

const useTimePickerNavigation = () => {
  const hoursRef = useRef<HTMLInputElement>(null);
  const minutesRef = useRef<HTMLInputElement>(null);
  const secondsRef = useRef<HTMLInputElement>(null);

  const refs = useMemo(
    () => ({
      hours: hoursRef,
      minutes: minutesRef,
      seconds: secondsRef,
    }),
    []
  );

  const handleNavigate = useCallback(
    (from: TimeUnit, direction: Direction) => {
      const nextUnitMap: Record<TimeUnit, Record<Direction, TimeUnit>> = {
        hours: { left: "seconds", right: "minutes" },
        minutes: { left: "hours", right: "seconds" },
        seconds: { left: "minutes", right: "hours" },
      };

      const nextUnit = nextUnitMap[from][direction];
      refs[nextUnit].current?.focus();
      refs[nextUnit].current?.select();
    },
    [refs]
  );

  return {
    hoursRef: refs.hours,
    minutesRef: refs.minutes,
    secondsRef: refs.seconds,
    handleNavigate,
  };
};

export default useTimePickerNavigation;

// import { useCallback, useMemo, useRef } from "react";

// type TimeUnit = "hours" | "minutes" | "seconds";
// type Direction = "left" | "right";

// const useTimePickerNavigation = () => {
//   const hoursRef = useRef<HTMLInputElement>(null);
//   const minutesRef = useRef<HTMLInputElement>(null);
//   const secondsRef = useRef<HTMLInputElement>(null);

//   const refs = useMemo(
//     () => ({
//       hours: hoursRef,
//       minutes: minutesRef,
//       seconds: secondsRef,
//     }),
//     []
//   );

//   const handleNavigate = useCallback(
//     (from: TimeUnit, direction: Direction) => {
//       const nextRefMap: Record<TimeUnit, Record<Direction, TimeUnit>> = {
//         hours: { left: "hours", right: "minutes" },
//         minutes: { left: "hours", right: "seconds" },
//         seconds: { left: "minutes", right: "seconds" },
//       };

//       const nextUnit = nextRefMap[from][direction];
//       console.log("Handle Navigate:", { from, direction, nextUnit });
//       refs[nextUnit].current?.focus();
//     },
//     [refs]
//   );

//   return {
//     hoursRef: refs.hours,
//     minutesRef: refs.minutes,
//     secondsRef: refs.seconds,
//     handleNavigate,
//   };
// };

// export default useTimePickerNavigation;
