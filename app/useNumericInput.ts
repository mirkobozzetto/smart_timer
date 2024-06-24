export const generateNumericValue = (
  currentValue: string,
  lastEnteredDigit: string,
  max: number
): string => {
  const tentativeValue = currentValue[1] + lastEnteredDigit;
  const numericValue = parseInt(tentativeValue, 10);

  if (numericValue >= 0 && numericValue <= max) {
    return tentativeValue;
  } else {
    return "0" + lastEnteredDigit;
  }
};
