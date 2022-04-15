import { Result } from "../../constants/types";
import { threePlayerResult } from "../../tools/determineResult";

export const determineThreePlayer = (
  p1Score: number,
  p2Score: number,
  p3Score: number
) => {
  const result = threePlayerResult(p1Score, p2Score, p3Score);

  const resultOption: Record<Result, string> = {
    [Result.Win]: "You Win",
    [Result.Tie]: "Tie",
    [Result.Lose]: "Lose",
  };

  return resultOption[result];
};

export const threePlayerWinnerColour = (
  p1Score: number,
  p2Score: number,
  p3Score: number,
  p1Colour: string,
  p2Colour: string,
  p3Colour: string
) => {
  const scores = [
    [p1Score, p1Colour],
    [p2Score, p2Colour],
    [p3Score, p3Colour],
  ];
  scores.sort((a, b) => a[0] - b[0]).reverse();

  return scores;
};
