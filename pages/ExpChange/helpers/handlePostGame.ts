export const handlePostGame = (currentExp: number, gameDetails: any) => {
  let increment = 0;
  let newExp = 0;
  let win = false;
  let updates: string[] = [];

  // Update games played
  updates.push("TotalGames");
  updates.push("TotalClassicGames");

  // Determine if player won
  if (
    gameDetails.player1Score > gameDetails.player2Score &&
    gameDetails.player1Score > gameDetails.player3Score
  ) {
    win = true;
  } else {
  }

  // Increase wins if applicable and set increment
  if (win) {
    increment = 10;
    updates.push("TotalWins");
    updates.push("TotalClassicWins");
  } else {
    increment = 3;
  }

  // Increase Difficulty Played/Wins
  switch (gameDetails.difficulty) {
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

  // Handle remaining exp/level calculations
  increment *= gameDetails.rounds;
  newExp = currentExp + increment;

  // Update exp
  updates.push("TotalExp");

  return { currentExp, newExp, updates, increment };
};
