import { base, exponent } from "../constants/Exp";

export const calcExpToNextLevel = (levelToCheck: number) => {
  if (levelToCheck === 0) {
    return 100;
  } else {
    return Math.ceil((base * (levelToCheck + 1)) ** exponent);
  }
};
