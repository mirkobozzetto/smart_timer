import { useCallback, useEffect, useState } from "react";
import { useTimeStore } from "../store/timeStore";
import { TimeDirection, TimeUnit } from "../types/types";

interface UseNumericInputLogicProps {
  min: number;
  max: number;
  label: TimeUnit;
  onNavigate: (direction: TimeDirection) => void;
}

const useNumericInputLogic = ({
  min,
  max,
  label,
  onNavigate,
}: UseNumericInputLogicProps) => {
  const { [label]: storeValue, setTime } = useTimeStore();
  const [value, setValue] = useState(storeValue || "00");

  useEffect(() => {
    setValue(storeValue || "00");
  }, [storeValue]);

  // const handleKeyDown = useCallback(
  //   (e: React.KeyboardEvent<HTMLInputElement>) => {
  //     if (/^[0-9]$/.test(e.key)) {
  //       e.preventDefault();
  //       const newValue = (value.slice(-1) + e.key).padStart(2, "0");
  //       if (parseInt(newValue) >= min && parseInt(newValue) <= max) {
  //         setValue(newValue);
  //         setTime(label, newValue);
  //       }
  //     } else {
  //       switch (e.key) {
  //         case "ArrowLeft":
  //           if (e.currentTarget.selectionStart === 0) {
  //             e.preventDefault();
  //             onNavigate("left");
  //           }
  //           break;
  //         case "ArrowRight":
  //           if (e.currentTarget.selectionEnd === e.currentTarget.value.length) {
  //             e.preventDefault();
  //             onNavigate("right");
  //           }
  //           break;
  //         case "ArrowUp":
  //           e.preventDefault();
  //           const incrementedValue = Math.min(parseInt(value) + 1, max)
  //             .toString()
  //             .padStart(2, "0");
  //           setValue(incrementedValue);
  //           setTime(label, incrementedValue);
  //           break;
  //         case "ArrowDown":
  //           e.preventDefault();
  //           const decrementedValue = Math.max(parseInt(value) - 1, min)
  //             .toString()
  //             .padStart(2, "0");
  //           setValue(decrementedValue);
  //           setTime(label, decrementedValue);
  //           break;
  //       }
  //     }
  //   },
  //   [min, max, value, onNavigate, label, setTime]
  // );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (/^[0-9]$/.test(e.key)) {
        e.preventDefault();
        let newValue: string;

        if (value === "00") {
          // Si le champ est vide, commencez une nouvelle saisie
          newValue = e.key;
        } else if (value.length === 2 && value !== "00") {
          // Si deux chiffres ont déjà été saisis et ce n'est pas '00', décalez et ajoutez le nouveau chiffre
          newValue = value.slice(-1) + e.key;
        } else {
          // Sinon, ajoutez le nouveau chiffre à la fin
          newValue = value + e.key;
        }

        // Vérifiez si la nouvelle valeur est dans les limites
        const numericValue = parseInt(newValue);
        if (numericValue >= min && numericValue <= max) {
          newValue = newValue.padStart(2, "0");
          setValue(newValue);
          setTime(label, newValue);
        } else {
          // Si la valeur est hors limites, gardez seulement le dernier chiffre saisi
          newValue = e.key.padStart(2, "0");
          setValue(newValue);
          setTime(label, newValue);
        }
      } else {
        // Le reste du code pour les touches fléchées reste inchangé
        switch (e.key) {
          case "ArrowLeft":
            if (e.currentTarget.selectionStart === 0) {
              e.preventDefault();
              onNavigate("left");
            }
            break;
          case "ArrowRight":
            if (e.currentTarget.selectionEnd === e.currentTarget.value.length) {
              e.preventDefault();
              onNavigate("right");
            }
            break;
          case "ArrowUp":
            e.preventDefault();
            const incrementedValue = Math.min(parseInt(value) + 1, max)
              .toString()
              .padStart(2, "0");
            setValue(incrementedValue);
            setTime(label, incrementedValue);
            break;
          case "ArrowDown":
            e.preventDefault();
            const decrementedValue = Math.max(parseInt(value) - 1, min)
              .toString()
              .padStart(2, "0");
            setValue(decrementedValue);
            setTime(label, decrementedValue);
            break;
        }
      }
    },
    [min, max, value, onNavigate, label, setTime]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value.replace(/\D/g, "");
      if (
        newValue === "" ||
        (parseInt(newValue) >= min && parseInt(newValue) <= max)
      ) {
        const paddedValue = newValue.padStart(2, "0");
        setValue(paddedValue);
        setTime(label, paddedValue);
      }
    },
    [min, max, label, setTime]
  );

  return { value, handleKeyDown, handleChange };
};

export default useNumericInputLogic;
