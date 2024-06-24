import React, { useState } from "react";

const NumericInput = () => {
  const [value, setValue] = useState("00");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const lastDigit = inputValue[inputValue.length - 1];
    const tentativeValue = value[1] + lastDigit;
    const numericValue = parseInt(tentativeValue, 10);

    if (numericValue >= 0 && numericValue <= 59) {
      setValue(tentativeValue);
    } else {
      setValue("0" + lastDigit);
    }
  };

  return (
    <input
      type="text"
      className="w-20 font-bold text-center text-lg cursor-default caret-transparent outline-none"
      value={value}
      onChange={handleChange}
      maxLength={3} // Permet d'entrer un chiffre de plus pour déclencher le changement
      onKeyDown={(e) => {
        if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
          e.preventDefault();
        }
      }}
    />
  );
};

export default NumericInput;
