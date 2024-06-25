import { useCallback, useState } from "react";

const useFocusClass = (
  ref: React.RefObject<HTMLInputElement>,
  focusClass: string
) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    focusClass.split(" ").forEach((cls) => ref.current?.classList.add(cls));
  }, [focusClass, ref]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    focusClass.split(" ").forEach((cls) => ref.current?.classList.remove(cls));
  }, [focusClass, ref]);

  return {
    handleFocus,
    handleBlur,
    isFocused,
  };
};

export default useFocusClass;
