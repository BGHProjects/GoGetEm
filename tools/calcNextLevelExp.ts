import { base, exponent } from "../constants/Exp";

export const calcExpToNextLevel = (levelToCheck: number) => {
  return Math.ceil((base * (levelToCheck + 1)) ** exponent);
};
