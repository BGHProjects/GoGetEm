import React, { useEffect, useContext } from "react";
import { ScrollView } from "react-native";
import BGWithImage from "../../components/BGWithImage";
import TitleText from "../../components/TitleText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Data } from "../../constants/types";
import { UserContext } from "../../tools/UserContext";
import { lowerFirst } from "lodash";
import { MainMenuOption } from "../../constants/types";
import MainMenuButton from "../../components/MainMenuButton";

const MainMenu = ({ navigation }: any) => {
  const userContext = useContext(UserContext);

  const onPressButton = (page: string) => {
    // Just so the mapping function below is clean
    if (page === "Play") page = "Game Modes";
    navigation.navigate(page);
  };

  // Runs initially
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    // TODO Find a more appropriate field to check
    const itemToCheck = await AsyncStorage.getItem(Data.Level);

    // If there is no level set to storage, this is a first time user
    if (itemToCheck === null) {
      console.log("\nInitialising the values for a new user");
      setInitialValues();
    }
    // Else set the context to be what is stored on the device
    else {
      console.log("\nWe are populating from storage");
      populateFromStorage();
    }
  };

  const setInitialValues = () => {
    const initialBackgrounds: Record<string, string> = {
      ClassicBackground: "forest",
      ChasedownBackground: "mountains",
      HuntBackground: "snow",
      TagTeamBackground: "forest",
    };

    const initialController: Record<string, string> = {
      ControllerOutlineColour: "outline-white",
      ControllerLeftButton: "left-white-circle",
      ControllerRightButton: "right-white-circle",
      ControllerTopButton: "top-white-circle",
      ControllerDownButton: "down-white-circle",
    };

    let populateObject: Record<string, unknown> = {};

    Object.keys(Data).map(async (dataEntry) => {
      // Handles controller data
      if (dataEntry.includes("Colour") || dataEntry.includes("Button")) {
        await AsyncStorage.setItem(dataEntry, initialController[dataEntry]);
        populateObject[lowerFirst(dataEntry)] = initialController[dataEntry];
      } else if (dataEntry.includes("Background")) {
        await AsyncStorage.setItem(dataEntry, initialBackgrounds[dataEntry]);
        populateObject[lowerFirst(dataEntry)] = initialBackgrounds[dataEntry];
      } else {
        await AsyncStorage.setItem(dataEntry, "0");
        populateObject[lowerFirst(dataEntry)] = 0;
      }
    });

    userContext.populateFromDatabase(populateObject);
  };

  const populateFromStorage = async () => {
    let populateObject: Record<string, unknown> = {};

    await Promise.all(
      Object.keys(Data).map(async (dataKey) => {
        let dataValue = await AsyncStorage.getItem(dataKey);
        // Converts any strings that should be numbers into numbers
        if (!isNaN(dataValue)) {
          dataValue = Number(dataValue);
        }
        // The keys in the context are lowercase
        populateObject[lowerFirst(dataKey)] = dataValue;
      })
    );

    userContext.populateFromDatabase(populateObject);
  };

  return (
    <BGWithImage image={"mainMenu"}>
      <>
        <TitleText text="GoGetEm" style={{ marginBottom: 40 }} />
        <ScrollView>
          {Object.keys(MainMenuOption).map((option, index) => (
            <MainMenuButton
              key={option.toString()}
              text={option}
              operation={() => onPressButton(option)}
              menuOption={MainMenuOption[option as keyof typeof MainMenuOption]}
              delay={index * 300}
            />
          ))}
        </ScrollView>
      </>
    </BGWithImage>
  );
};

export default MainMenu;
