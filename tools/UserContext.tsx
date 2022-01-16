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
  level: 0;
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
  level: 0,
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
  if (state !== undefined) {
    switch (action.type) {
      case "connectionChange":
        state.connected = action.payload;
        return state;
      case "increaseExp":
        state.totalExp += action.payload;
        return state;
      case "increaseLevel":
        state.level += action.payload;
        return state;
      case "increaseGames":
        state.totalGames += action.payload;
        return state;
      case "increaseWins":
        console.log(`state in userReducer`, state);
        state.totalWins += action.payload;
        return state;
      case "increaseClassicGames":
        state.totalClassicGames += action.payload;
        break;
      case "increaseClassicWins":
        state.totalClassicWins += action.payload;
        break;
      case "increaseChasedownGames":
        state.totalChasedownGames += action.payload;
        break;
      case "increaseChasedownWins":
        state.totalChasedownWins += action.payload;
        break;
      case "increaseTagTeamGames":
        state.totalTagTeamGames += action.payload;
        break;
      case "increaseTagTeamWins":
        state.totalTagTeamWins += action.payload;
        break;
      case "increaseHuntGames":
        state.totalHuntGames += action.payload;
        break;
      case "increaseHuntWins":
        state.totalHuntWins += action.payload;
        break;
      case "increaseDiff1Games":
        state.totalDiff1Games += action.payload;
        break;
      case "increaseDiff1Wins":
        state.totalDiff1Wins += action.payload;
        break;
      case "increaseDiff2Games":
        state.totalDiff2Games += action.payload;
        break;
      case "increaseDiff2Wins":
        state.totalDiff2Wins += action.payload;
        break;
      case "increaseDiff3Games":
        state.totalDiff3Games += action.payload;
        break;
      case "increaseDiff3Wins":
        state.totalDiff3Wins += action.payload;
        break;
      case "increaseDiff4Games":
        state.totalDiff4Games += action.payload;
        break;
      case "increaseDiff4Wins":
        state.totalDiff4Wins += action.payload;
        break;
      case "assignName":
        state.username = action.payload;
        return state;
      case "populateFromDatabase":
        state.username = action.payload.username;
        state.connected = action.payload.connected;
        state.defaultColour = action.payload.defaultColour;
        state.controllerOutlineColour = action.payload.controllerOutlineColour;
        state.controllerLeftButton = action.payload.controllerLeftButton;
        state.controllerRightButton = action.payload.controllerRightButton;
        state.controllerTopButton = action.payload.controllerTopButton;
        state.controllerBottomButton = action.payload.controllerBottomButton;
        state.level = action.payload.level;
        state.totalExp = action.payload.totalExp;
        state.totalGames = action.payload.totalGames;
        state.totalWins = action.payload.totalWins;
        state.totalClassicWins = action.payload.totalClassicWins;
        state.totalClassicGames = action.payload.totalClassicGames;
        state.totalChasedownWins = action.payload.totalChasedownWins;
        state.totalChasedownGames = action.payload.totalChasedownGames;
        state.totalHuntWins = action.payload.totalHuntWins;
        state.totalHuntGames = action.payload.totalHuntGames;
        state.totalTagTeamWins = action.payload.totalTagTeamWins;
        state.totalTagTeamGames = action.payload.totalTagTeamGames;
        state.totalDiff1Wins = action.payload.totalDiff1Wins;
        state.totalDiff1Games = action.payload.totalDiff1Games;
        state.totalDiff2Wins = action.payload.totalDiff2Wins;
        state.totalDiff2Games = action.payload.totalDiff2Games;
        state.totalDiff3Wins = action.payload.totalDiff3Wins;
        state.totalDiff3Games = action.payload.totalDiff3Games;
        state.totalDiff4Wins = action.payload.totalDiff4Wins;
        state.totalDiff4Games = action.payload.totalDiff4Games;
        return state;
      default:
        console.log(`default state called`);
        return state;
    }
  }
};

export const UserContext = createContext(userDetails);
