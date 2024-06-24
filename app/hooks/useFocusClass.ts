import { useCallback } from "react";

const useFocusClass = (
  ref: React.RefObject<HTMLInputElement>,
  focusClass: string
) => {
  const handleFocus = useCallback(() => {
    focusClass.split(" ").forEach((cls) => ref.current?.classList.add(cls));
  }, [focusClass, ref]);

  const handleBlur = useCallback(() => {
    focusClass.split(" ").forEach((cls) => ref.current?.classList.remove(cls));
  }, [focusClass, ref]);

  return {
    handleFocus,
    handleBlur,
  };
};

export default useFocusClass;
