import React, { createContext, useReducer } from "react";

interface User {
  username: string | null;
  connected: Boolean;
  defaultColour: string;
  controllerOutlineColour: string;
  controllerLeftButton: string;
  controllerRightButton: string;
  controllerTopButton: string;
  controllerBottomButton: string;
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
  username: null,
  connected: false,
  defaultColour: "blue",
  controllerOutlineColour: "red",
  controllerLeftButton: "default-colour",
  controllerRightButton: "default-colour",
  controllerTopButton: "default-colour",
  controllerBottomButton: "default-colour",
  totalExp: 0,
  totalGames: 0,
  totalWins: 0,
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
      state.username = action.payload;
      return state;
    case "populateFromDatabase":
      console.log(`populateFromDatabase called`);
      state = action.payload;
      console.log(`state`, state);
      return state;
    default:
      return state;
  }
};

export const UserContext = createContext(userDetails);
