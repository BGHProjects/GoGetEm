import { useUpdateUser } from "../../../tools/hooks/useUpdateUser";

export const handlePostGame = (currentExp: number, gameDetails: any) => {
  let increment = 0;
  let newExp = 0;
  let win = false;

  // Update games played
  useUpdateUser("increaseGames");
  useUpdateUser("increaseClassicGames");

  // Determine if player won
  if (
    gameDetails.player1Score > gameDetails.player2Score &&
    gameDetails.player1Score > gameDetails.player3Score
  ) {
    win = true;
  }

  // Increase wins if applicable and set increment
  if (win) {
    increment = 10;
    useUpdateUser("increaseWins");
    useUpdateUser("increaseClassicWins");
  } else {
    increment = 3;
  }

  // Increase Difficulty Played/Wins
  switch (gameDetails.difficulty) {
    case "Meh":
      useUpdateUser("increaseDiff1Games");
      if (win) {
        useUpdateUser("increaseDiff1Wins");
      }
      break;
    case "Oh OK":
      useUpdateUser("increaseDiff2Games");
      if (win) {
        useUpdateUser("increaseDiff2Wins");
      }
      increment *= 2;
      break;
    case "Hang On":
      useUpdateUser("increaseDiff3Games");
      if (win) {
        useUpdateUser("increaseDiff3Wins");
      }
      increment *= 3;
      break;
    case "What The":
      useUpdateUser("increaseDiff4Games");
      if (win) {
        useUpdateUser("increaseDiff4Wins");
      }
      increment *= 4;
      break;
  }

  // Handle remaining exp/level calculations
  increment *= gameDetails.rounds;
  newExp = currentExp + increment;

  // Update exp
  useUpdateUser("increaseExp", increment);

  return [currentExp, newExp];
};
