export const determineClassic = (
  p1Score: number,
  p2Score: number,
  p3Score: number
) => {
  let result;
  if (p1Score > p2Score && p1Score > p3Score) {
    result = "You Win";
  } else if (
    (p2Score > p3Score && p2Score === p1Score) ||
    (p3Score > p2Score && p3Score === p1Score) ||
    (p1Score === p2Score && p1Score === p3Score)
  ) {
    result = "Tie";
  } else {
    result = "You Lose";
  }

  return result;
};

export const classicWinnerColour = (
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
