import React, { createContext, useReducer } from "react";

interface User {
  userName: string | null;
  connected: Boolean;
  defaultColour: string;
  controllerOutlineColour: string;
  controllerLeftButtonStyle: string;
  controllerLeftButtonColour: string;
  controllerRightButtonStyle: string;
  controllerRightButtonColour: string;
  controllerTopButtonStyle: string;
  controllerTopButtonColour: string;
  controllerBottomButtonStyle: string;
  controllerBottomButtonColour: string;
  totalExp: number;
  totalGames: number;
  totalWins: number;
  totalClassicWins: number;
  totalClassicGames: number;
  totalChasedownWins: number;
  totalChasedownGames: number;
  totalHuntWins: number;
  totalHuntGames: number;
  totalTagTeamWins: number;
  totalTagTeamGames: number;
  totalDiff1Wins: number;
  totalDiff1Games: number;
  totalDiff2Wins: number;
  totalDiff2Games: number;
  totalDiff3Wins: number;
  totalDiff3Games: number;
  totalDiff4Wins: number;
  totalDiff4Games: number;
}

export const userDetails: User = {
  userName: null,
  connected: false,
  defaultColour: "red",
  controllerOutlineColour: "red",
  controllerLeftButtonStyle: "default",
  controllerLeftButtonColour: "default",
  controllerRightButtonStyle: "default",
  controllerRightButtonColour: "default",
  controllerTopButtonStyle: "default",
  controllerTopButtonColour: "default",
  controllerBottomButtonStyle: "default",
  controllerBottomButtonColour: "default",
  totalExp: 0,
  totalClassicWins: 0,
  totalClassicGames: 0,
  totalChasedownWins: 0,
  totalChasedownGames: 0,
  totalHuntWins: 0,
  totalHuntGames: 0,
  totalTagTeamWins: 0,
  totalTagTeamGames: 0,
  totalDiff1Wins: 0,
  totalDiff1Games: 0,
  totalDiff2Wins: 0,
  totalDiff2Games: 0,
  totalDiff3Wins: 0,
  totalDiff3Games: 0,
  totalDiff4Wins: 0,
  totalDiff4Games: 0,
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case "connectionChange":
      state.connected = action.payload;
      return state;
    case "increaseExp":
      state.totalExp += action.payload;
      return state;
    case "assignName":
      state.userName = action.payload;
      return state;
    default:
      return state;
  }
};

export const UserContext = createContext(userDetails);
