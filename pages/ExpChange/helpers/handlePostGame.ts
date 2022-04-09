import { useUpdateUser } from "../../../tools/hooks/useUpdateUser";

export const handlePostGame = (currentExp: number, gameDetails: any) => {
  let increment = 0;
  let newExp = 0;
  let win = false;
  let updates: string[] = [];

  // Update games played
  // useUpdateUser("increaseGames");
  // useUpdateUser("increaseClassicGames");
  updates.push("increaseGames");
  updates.push("increaseClassicGames");

  // Determine if player won
  if (
    gameDetails.player1Score > gameDetails.player2Score &&
    gameDetails.player1Score > gameDetails.player3Score
  ) {
    console.log("This was hit, the user won the game");
    win = true;
  } else {
    console.log("The user did not win the game");
  }

  // Increase wins if applicable and set increment
  if (win) {
    increment = 10;
    //useUpdateUser("increaseWins");
    //useUpdateUser("increaseClassicWins");
    updates.push("increaseWins");
    updates.push("increaseClassicWins");
  } else {
    increment = 3;
  }

  console.log("increment after win determined", increment);

  // Increase Difficulty Played/Wins
  switch (gameDetails.difficulty) {
    case "Meh":
      // useUpdateUser("increaseDiff1Games");
      updates.push("increaseDiff1Games");
      if (win) {
        // useUpdateUser("increaseDiff1Wins");
        updates.push("increaseDiff1Wins");
      }
      break;
    case "Oh OK":
      //useUpdateUser("increaseDiff2Games");
      updates.push("increaseDiff2Games");
      if (win) {
        //useUpdateUser("increaseDiff2Wins");
        updates.push("increaseDiff2Wins");
      }
      increment *= 2;
      break;
    case "Hang On":
      //useUpdateUser("increaseDiff3Games");
      updates.push("increaseDiff3Games");
      if (win) {
        //useUpdateUser("increaseDiff3Wins");
        updates.push("increaseDiff3Wins");
      }
      increment *= 3;
      break;
    case "What The":
      //useUpdateUser("increaseDiff4Games");
      updates.push("increaseDiff4Games");
      if (win) {
        //useUpdateUser("increaseDiff4Wins");
        updates.push("increaseDiff4Wins");
      }
      increment *= 4;
      break;
  }

  console.log("increment after difficulty determined", increment);

  console.log("gameDetails.rounds in handlePostGame", gameDetails.rounds);

  // Handle remaining exp/level calculations
  increment *= gameDetails.rounds;
  newExp = currentExp + increment;

  console.log("increment at the end of handlePostGame", increment);
  console.log("newExp in handlePostGame", newExp);

  // Update exp
  // useUpdateUser("increaseExp", increment);
  updates.push("increaseExp");

  return [currentExp, newExp, updates, increment];
};
