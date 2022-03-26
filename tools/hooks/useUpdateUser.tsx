import { useEffect, useContext, useReducer } from "react";
import { UserContext, userReducer } from "../../tools/UserContext";
import * as firebase from "firebase";

export const useUpdateUser = (option: string, increment?: number) => {
  const userContext = useContext(UserContext);
  const [state, dispatch] = useReducer(userReducer, userContext);
  const user = firebase.database().ref("users/" + userContext.username);

  const updateOptions: Record<string, any> = {
    increaseGames: user.update({
      totalGames: userContext.totalGames + 1,
    }),
    increaseWins: user.update({
      totalWins: userContext.totalWins + 1,
    }),
    increaseClassiGames: user.update({
      totalClassicGames: userContext.totalClassicGames + 1,
    }),
    increaseClassicWins: user.update({
      totalClassicWins: userContext.totalClassicWins + 1,
    }),
    increaseDiff1Games: user.update({
      totalDiff1Games: userContext.totalDiff1Games + 1,
    }),
    increaseDiff1Wins: user.update({
      totalDiff1Wins: userContext.totalDiff1Wins + 1,
    }),
    increaseDiff2Games: user.update({
      totalDiff2Games: userContext.totalDiff2Games + 1,
    }),
    increaseDiff2Wins: user.update({
      totalDiff2Wins: userContext.totalDiff2Wins + 1,
    }),
    increaseDiff3Games: user.update({
      totalDiff3Games: userContext.totalDiff3Games + 1,
    }),
    increaseDiff3Wins: user.update({
      totalDiff3Wins: userContext.totalDiff3Wins + 1,
    }),
    increaseDiff4Games: user.update({
      totalDiff4Games: userContext.totalDiff4Games + 1,
    }),
    increaseDiff4Wins: user.update({
      totalDiff4Wins: userContext.totalDiff4Wins + 1,
    }),
    increaseLevel: user.update({
      level: userContext.level + 1,
    }),
    increaseExp: user.update({
      totalExp: increment
        ? userContext.totalExp + increment
        : userContext.totalExp + 0,
    }),
  };

  useEffect(() => {
    updateOptions[option];
    dispatch({ type: option, payload: 1 });
  }, []);
};
