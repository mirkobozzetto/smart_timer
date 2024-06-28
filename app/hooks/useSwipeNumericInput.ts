import { useCallback, useEffect, useState } from "react";

interface SwipeNumericInputHook {
  min: number;
  max: number;
  initialValue: string;
  onValueChange: (value: string) => void;
  event: React.TouchEvent<HTMLInputElement>;
}

const useSwipeNumericInput = ({
  min,
  max,
  initialValue,
  onValueChange,
}: SwipeNumericInputHook) => {
  const [value, setValue] = useState(initialValue);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  const handleTouchStart = useCallback(
    (event: React.TouchEvent<HTMLInputElement>) => {
      setTouchStartY(event.touches[0].clientY);
    },
    []
  );

  const handleTouchMove = useCallback(
    (event: React.TouchEvent<HTMLInputElement>) => {
      if (touchStartY === null) {
        return;
      }

      const currentTouchY = event.touches[0].clientY;
      const touchDiffY = touchStartY - currentTouchY;

      if (touchDiffY > 20) {
        //@ts-ignore
        setValue((prevValue) => Math.min(prevValue + 1, max));
      } else if (touchDiffY < -20) {
        //@ts-ignore
        setValue((prevValue) => Math.max(prevValue - 1, min));
      }
    },
    [touchStartY, min, max]
  );

  const handleTouchEnd = useCallback(() => {
    setTouchStartY(null);
  }, []);

  useEffect(() => {
    onValueChange(value);
  }, [value, onValueChange]);

  return {
    value,
    setValue,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};

export default useSwipeNumericInput;
