export const handlePostGameDifficulty = (
  difficulty: string,
  win: boolean,
  increment: number
) => {
  let updates: string[] = [];

  // Increase Difficulty Played/Wins
  switch (difficulty) {
    case "Meh":
      updates.push("TotalDiff1Games");
      if (win) {
        updates.push("TotalDiff1Wins");
      }
      break;
    case "Oh OK":
      updates.push("TotalDiff2Games");
      if (win) {
        updates.push("TotalDiff2Wins");
      }
      increment *= 2;
      break;
    case "Hang On":
      updates.push("TotalDiff3Games");
      if (win) {
        updates.push("TotalDiff3Wins");
      }
      increment *= 3;
      break;
    case "What The":
      updates.push("TotalDiff4Games");
      if (win) {
        updates.push("TotalDiff4Wins");
      }
      increment *= 4;
      break;
  }

  return { updates, increment };
};
