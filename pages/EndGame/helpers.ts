import { Result } from "../../constants/types";
import {
  threePlayerResult,
  twoPlayerResult,
} from "../../tools/determineResult";

const resultOption: Record<Result, string> = {
  [Result.Win]: "You Win",
  [Result.Tie]: "Tie",
  [Result.Lose]: "You Lose",
};

// Sorts scores so that the highest is the first in the array
const sortScores = (scores: Array<any>) =>
  scores.sort((a, b) => a[0] - b[0]).reverse();

export const determineThreePlayer = (
  p1Score: number,
  p2Score: number,
  p3Score: number
) => {
  const result = threePlayerResult(p1Score, p2Score, p3Score);
  return resultOption[result];
};

export const determineTwoPlayer = (p1Score: number, p2Score: number) => {
  const result = twoPlayerResult(p1Score, p2Score);
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

  return sortScores(scores);
};

// Also handles TagTeam
export const twoPlayerWinnerColour = (
  p1Score: number,
  p2Score: number,
  p1Colour?: string,
  p2Colour?: string,
  team1?: string[],
  team2?: string[]
) => {
  let scores;

  if (team1 && team2) {
    scores = [
      [p1Score, [team1]],
      [p2Score, [team2]],
    ];
  } else {
    scores = [
      [p1Score, p1Colour],
      [p2Score, p2Colour],
    ];
  }

  return sortScores(scores);
};
