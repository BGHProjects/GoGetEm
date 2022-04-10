import React, { createContext, useState, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";

interface User {
  username: string | null;
  setUsername: React.Dispatch<React.SetStateAction<string | null>>;
  connected: Boolean;
  setConnected: React.Dispatch<React.SetStateAction<Boolean>>;
  defaultColour: string;
  setDefaultColour: React.Dispatch<React.SetStateAction<string>>;
  controllerOutlineColour: string;
  setControllerOutlineColour: React.Dispatch<React.SetStateAction<string>>;
  controllerLeftButton: string;
  setControllerLeftButton: React.Dispatch<React.SetStateAction<string>>;
  controllerRightButton: string;
  setControllerRightButton: React.Dispatch<React.SetStateAction<string>>;
  controllerTopButton: string;
  setControllerTopButton: React.Dispatch<React.SetStateAction<string>>;
  controllerDownButton: string;
  setControllerDownButton: React.Dispatch<React.SetStateAction<string>>;
  totalExp: number;
  setTotalExp: React.Dispatch<React.SetStateAction<number>>;
  level: number;
  setLevel: React.Dispatch<React.SetStateAction<number>>;
  totalGames: number;
  setTotalGames: React.Dispatch<React.SetStateAction<number>>;
  totalWins: number;
  setTotalWins: React.Dispatch<React.SetStateAction<number>>;
  totalClassicWins: number;
  setTotalClassicWins: React.Dispatch<React.SetStateAction<number>>;
  totalClassicGames: number;
  setTotalClassicGames: React.Dispatch<React.SetStateAction<number>>;
  totalChasedownWins: number;
  setTotalChasedownWins: React.Dispatch<React.SetStateAction<number>>;
  totalChasedownGames: number;
  setTotalChasedownGames: React.Dispatch<React.SetStateAction<number>>;
  totalHuntWins: number;
  setTotalHuntWins: React.Dispatch<React.SetStateAction<number>>;
  totalHuntGames: number;
  setTotalHuntGames: React.Dispatch<React.SetStateAction<number>>;
  totalTagTeamWins: number;
  setTotalTagTeamWins: React.Dispatch<React.SetStateAction<number>>;
  totalTagTeamGames: number;
  setTotalTagTeamGames: React.Dispatch<React.SetStateAction<number>>;
  totalDiff1Wins: number;
  setTotalDiff1Wins: React.Dispatch<React.SetStateAction<number>>;
  totalDiff1Games: number;
  setTotalDiff1Games: React.Dispatch<React.SetStateAction<number>>;
  totalDiff2Wins: number;
  setTotalDiff2Wins: React.Dispatch<React.SetStateAction<number>>;
  totalDiff2Games: number;
  setTotalDiff2Games: React.Dispatch<React.SetStateAction<number>>;
  totalDiff3Wins: number;
  setTotalDiff3Wins: React.Dispatch<React.SetStateAction<number>>;
  totalDiff3Games: number;
  setTotalDiff3Games: React.Dispatch<React.SetStateAction<number>>;
  totalDiff4Wins: number;
  setTotalDiff4Wins: React.Dispatch<React.SetStateAction<number>>;
  totalDiff4Games: number;
  setTotalDiff4Games: React.Dispatch<React.SetStateAction<number>>;
  classicBackground: string;
  setClassicBackground: React.Dispatch<React.SetStateAction<string>>;
  chasedownBackground: string;
  setChasedownBackground: React.Dispatch<React.SetStateAction<string>>;
  huntBackground: string;
  setHuntBackground: React.Dispatch<React.SetStateAction<string>>;
  tagTeamBackground: string;
  setTagTeamBackground: React.Dispatch<React.SetStateAction<string>>;
  unlockedItems: string[];
  setUnlockedItems: React.Dispatch<React.SetStateAction<string[]>>;
  populateFromDatabase: Function;
}

export const userDetails: User = {
  username: null,
  setUsername: () => {},
  connected: false,
  setConnected: () => {},
  defaultColour: "white",
  setDefaultColour: () => {},
  controllerOutlineColour: "outline-white",
  setControllerOutlineColour: () => {},
  controllerLeftButton: "left-white-circle",
  setControllerLeftButton: () => {},
  controllerRightButton: "right-white-circle",
  setControllerRightButton: () => {},
  controllerTopButton: "top-white-circle",
  setControllerTopButton: () => {},
  controllerDownButton: "down-white-circle",
  setControllerDownButton: () => {},
  level: 0,
  setLevel: () => {},
  totalExp: 0,
  setTotalExp: () => {},
  totalGames: 0,
  setTotalGames: () => {},
  totalWins: 0,
  setTotalWins: () => {},
  totalClassicWins: 0,
  setTotalClassicWins: () => {},
  totalClassicGames: 0,
  setTotalClassicGames: () => {},
  totalChasedownWins: 0,
  setTotalChasedownWins: () => {},
  totalChasedownGames: 0,
  setTotalChasedownGames: () => {},
  totalHuntWins: 0,
  setTotalHuntWins: () => {},
  totalHuntGames: 0,
  setTotalHuntGames: () => {},
  totalTagTeamWins: 0,
  setTotalTagTeamWins: () => {},
  totalTagTeamGames: 0,
  setTotalTagTeamGames: () => {},
  totalDiff1Wins: 0,
  setTotalDiff1Wins: () => {},
  totalDiff1Games: 0,
  setTotalDiff1Games: () => {},
  totalDiff2Wins: 0,
  setTotalDiff2Wins: () => {},
  totalDiff2Games: 0,
  setTotalDiff2Games: () => {},
  totalDiff3Wins: 0,
  setTotalDiff3Wins: () => {},
  totalDiff3Games: 0,
  setTotalDiff3Games: () => {},
  totalDiff4Wins: 0,
  setTotalDiff4Wins: () => {},
  totalDiff4Games: 0,
  setTotalDiff4Games: () => {},
  classicBackground: "forest",
  setClassicBackground: () => {},
  chasedownBackground: "mountains",
  setChasedownBackground: () => {},
  huntBackground: "snow",
  setHuntBackground: () => {},
  tagTeamBackground: "forest",
  setTagTeamBackground: () => {},
  unlockedItems: [],
  setUnlockedItems: () => {},
  populateFromDatabase: () => {},
};

export const UserContext = createContext(userDetails);

export const UserContextProvider = ({
  children,
}: React.ReactNode | React.ReactNodeArray | JSX.Element) => {
  const [username, setUsername] = useState<string | null>(null);
  const [connected, setConnected] = useState<Boolean>(false);
  const [defaultColour, setDefaultColour] = useState<string>("white");
  const [controllerOutlineColour, setControllerOutlineColour] =
    useState<string>("outline-white");
  const [controllerLeftButton, setControllerLeftButton] =
    useState<string>("left-white-circle");
  const [controllerRightButton, setControllerRightButton] =
    useState<string>("right-white-circle");
  const [controllerTopButton, setControllerTopButton] =
    useState<string>("top-white-circle");
  const [controllerDownButton, setControllerDownButton] =
    useState<string>("down-white-circle");
  const [level, setLevel] = useState<number>(0);
  const [totalExp, setTotalExp] = useState<number>(0);
  const [totalGames, setTotalGames] = useState<number>(0);
  const [totalWins, setTotalWins] = useState<number>(0);
  const [totalClassicWins, setTotalClassicWins] = useState<number>(0);
  const [totalClassicGames, setTotalClassicGames] = useState<number>(0);
  const [totalChasedownWins, setTotalChasedownWins] = useState<number>(0);
  const [totalChasedownGames, setTotalChasedownGames] = useState<number>(0);
  const [totalHuntWins, setTotalHuntWins] = useState<number>(0);
  const [totalHuntGames, setTotalHuntGames] = useState<number>(0);
  const [totalTagTeamWins, setTotalTagTeamWins] = useState<number>(0);
  const [totalTagTeamGames, setTotalTagTeamGames] = useState<number>(0);
  const [totalDiff1Wins, setTotalDiff1Wins] = useState<number>(0);
  const [totalDiff1Games, setTotalDiff1Games] = useState<number>(0);
  const [totalDiff2Wins, setTotalDiff2Wins] = useState<number>(0);
  const [totalDiff2Games, setTotalDiff2Games] = useState<number>(0);
  const [totalDiff3Wins, setTotalDiff3Wins] = useState<number>(0);
  const [totalDiff3Games, setTotalDiff3Games] = useState<number>(0);
  const [totalDiff4Wins, setTotalDiff4Wins] = useState<number>(0);
  const [totalDiff4Games, setTotalDiff4Games] = useState<number>(0);
  const [classicBackground, setClassicBackground] = useState<string>("forest");
  const [chasedownBackground, setChasedownBackground] =
    useState<string>("mountains");
  const [huntBackground, setHuntBackground] = useState<string>("snow");
  const [tagTeamBackground, setTagTeamBackground] = useState<string>("snow");
  const [unlockedItems, setUnlockedItems] = useState<string[]>([]);

  function populateFromDatabase(payload: any) {
    setUsername(payload.username);
    setConnected(payload.connected);
    setDefaultColour(payload.defaultColour);
    setControllerOutlineColour(payload.controllerOutlineColour);
    setControllerLeftButton(payload.controllerLeftButton);
    setControllerRightButton(payload.controllerRightButton);
    setControllerTopButton(payload.controllerTopButton);
    setControllerDownButton(payload.controllerDownButton);
    setLevel(payload.level);
    setTotalExp(payload.totalExp);
    setTotalGames(payload.totalGames);
    setTotalWins(payload.totalWins);
    setTotalClassicWins(payload.totalClassicWins);
    setTotalClassicGames(payload.totalClassicGames);
    setTotalChasedownWins(payload.totalChasedownWins);
    setTotalChasedownGames(payload.totalChasedownGames);
    setTotalHuntWins(payload.totalHuntWins);
    setTotalHuntGames(payload.totalHuntGames);
    setTotalTagTeamWins(payload.totalTagTeamWins);
    setTotalTagTeamGames(payload.totalTagTeamGames);
    setTotalDiff1Wins(payload.totalDiff1Wins);
    setTotalDiff1Games(payload.totalDiff1Games);
    setTotalDiff2Wins(payload.totalDiff2Wins);
    setTotalDiff2Games(payload.totalDiff2Games);
    setTotalDiff3Wins(payload.totalDiff3Wins);
    setTotalDiff3Games(payload.totalDiff3Games);
    setTotalDiff4Wins(payload.totalDiff4Wins);
    setTotalDiff4Games(payload.totalDiff4Games);
    setClassicBackground(payload.classicBackground);
    setChasedownBackground(payload.chasedownBackground);
    setHuntBackground(payload.huntBackground);
    setTagTeamBackground(payload.tagTeamBackground);
    setUnlockedItems(payload.unlockedItems);
  }

  // Checks and sets the internetconnection
  const checkConnection = NetInfo.fetch().then((state) => {
    if (state === null) {
      setConnected(false);
    } else {
      setConnected(state.isConnected);
    }
  });

  useEffect(() => {
    checkConnection;
  }, []);

  useEffect(() => {
    console.log("connected ", connected);
    if (connected !== null) {
      setConnected(connected);
    }
  }, [connected]);

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        connected,
        setConnected,
        defaultColour,
        setDefaultColour,
        controllerOutlineColour,
        setControllerOutlineColour,
        controllerLeftButton,
        setControllerLeftButton,
        controllerRightButton,
        setControllerRightButton,
        controllerTopButton,
        setControllerTopButton,
        controllerDownButton,
        setControllerDownButton,
        level,
        setLevel,
        totalExp,
        setTotalExp,
        totalGames,
        setTotalGames,
        totalWins,
        setTotalWins,
        totalClassicWins,
        setTotalClassicWins,
        totalClassicGames,
        setTotalClassicGames,
        totalChasedownWins,
        setTotalChasedownWins,
        totalChasedownGames,
        setTotalChasedownGames,
        totalHuntWins,
        setTotalHuntWins,
        totalHuntGames,
        setTotalHuntGames,
        totalTagTeamWins,
        setTotalTagTeamWins,
        totalTagTeamGames,
        setTotalTagTeamGames,
        totalDiff1Wins,
        setTotalDiff1Wins,
        totalDiff1Games,
        setTotalDiff1Games,
        totalDiff2Wins,
        setTotalDiff2Wins,
        totalDiff2Games,
        setTotalDiff2Games,
        totalDiff3Wins,
        setTotalDiff3Wins,
        totalDiff3Games,
        setTotalDiff3Games,
        totalDiff4Wins,
        setTotalDiff4Wins,
        totalDiff4Games,
        setTotalDiff4Games,
        classicBackground,
        setClassicBackground,
        chasedownBackground,
        setChasedownBackground,
        huntBackground,
        setHuntBackground,
        tagTeamBackground,
        setTagTeamBackground,
        unlockedItems,
        setUnlockedItems,
        populateFromDatabase,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
