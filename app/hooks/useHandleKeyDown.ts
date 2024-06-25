import { useCallback } from "react";

// const moveFocus = (input: HTMLInputElement, direction: "left" | "right") => {
//   if (direction === "left" && input.selectionStart === 0) {
//     input.setSelectionRange(0, 0);
//   } else if (
//     direction === "right" &&
//     input.selectionEnd === input.value.length
//   ) {
//     input.setSelectionRange(input.value.length, input.value.length);
//   }
// };

const useHandleKeyDown = (
  onNavigate: (direction: "left" | "right") => void,
  increment: () => void,
  decrement: () => void
) => {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const input = e.target as HTMLInputElement;

      const navigate = (direction: "left" | "right") => {
        console.log("Navigate:", direction);
        onNavigate(direction);
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
        case "ArrowUp":
          e.preventDefault();
          increment();
          break;
        case "ArrowDown":
          e.preventDefault();
          decrement();
          break;
        case "Backspace":
          break;
        default:
          if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
          }
      }
    },
    [onNavigate, increment, decrement]
  );

  return handleKeyDown;
};

export default useHandleKeyDown;
