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

  /**
   * Handle navigation between time units
   * @param from The current time unit
   * @param direction The direction of navigation
   * @returns void
   * @description
   * This function is called when the user navigates between time units.
   * It updates the refs of the input fields and selects the next unit.
   */
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
