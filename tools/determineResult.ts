import { Result } from "../constants/types";

// TODO Decide if I actually need this one
export const determineResult = (
  mode: string,
  score1: number,
  score2: number,
  score3?: number
) => {
  let resultOptions: Record<string, Result> = {
    Classic: threePlayerResult(score1, score2, score3!),
    Chasedown: threePlayerResult(score1, score2, score3!),
  };

  return resultOptions[mode];
};

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
