import { handlePostGameDifficulty } from "./handlePostGameDifficulty";
import { threePlayerResult } from "../../../tools/determineResult";
import { Result } from "../../../constants/types";
import { loseIncrement, winIncrement } from "../../../constants/Exp";

/**
 * Decides what updates to the user's experience and statistics are required following the aftermath of the game
 * @param currentExp The user's current exp
 * @param gameDetails The results of the game that was just played
 * @returns currentExp, the newExp, the list of statistical changes, and the increment to the user's exp
 */
export const handlePostGame = (currentExp: number, gameDetails: any) => {
  let increment = 0;
  let newExp = 0;
  let win = false;
  let updates: string[] = [];

  // Update games played
  updates.push("TotalGames");
  updates.push(`Total${gameDetails.mode}Games`);

  const postGameResultOptions: Record<string, Result> = {
    Classic: threePlayerResult(
      gameDetails.player1Score,
      gameDetails.player2Score,
      gameDetails.player3Score
    ),
    Chasedown: threePlayerResult(
      gameDetails.player1Score,
      gameDetails.player2Score,
      gameDetails.player3Score
    ),
  };

  // Determine if player won
  if (postGameResultOptions[gameDetails.mode] === Result.Win) {
    win = true;
  }

  // Increase wins if applicable and set increment
  if (win) {
    increment = winIncrement[gameDetails.mode];
    updates.push("TotalWins");
    updates.push(`Total${gameDetails.mode}Wins`);
  } else {
    increment = loseIncrement[gameDetails.mode];
  }

  // Increase Difficulty Played/Wins
  const { updates: diffUpdates, increment: diffIncrement } =
    handlePostGameDifficulty(gameDetails.difficulty, win, increment);

  diffUpdates.map((update: string) => {
    updates.push(update);
  });

  increment = diffIncrement;

  // Handle remaining exp/level calculations
  increment *= gameDetails.rounds;
  newExp = currentExp + increment;

  // Update exp
  updates.push("TotalExp");

  return { currentExp, newExp, updates, increment };
};
