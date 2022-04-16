import { Result } from "../constants/types";

export const threePlayerResult = (
  p1Score: number,
  p2Score: number,
  p3Score: number
) => {
  let result: Result;
  if (p1Score > p2Score && p1Score > p3Score) {
    result = Result.Win;
  } else if (
    (p2Score > p3Score && p2Score === p1Score) ||
    (p3Score > p2Score && p3Score === p1Score) ||
    (p1Score === p2Score && p1Score === p3Score)
  ) {
    result = Result.Tie;
  } else {
    result = Result.Lose;
  }

  return result;
};

export const twoPlayerResult = (p1Score: number, p2Score: number) => {
  if (p1Score > p2Score) return Result.Win;
  if (p1Score === p2Score) return Result.Tie;
  return Result.Lose;
};
