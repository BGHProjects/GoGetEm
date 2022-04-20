import React, { useEffect, useContext } from "react";
import BGWithImage from "../../components/BGWithImage";
import MenuButton from "../../components/MenuButton";
import { Colors } from "../../constants/Colors";
import TitleText from "../../components/TitleText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Data } from "../../constants/types";
import { UserContext } from "../../tools/UserContext";
import { lowerFirst } from "lodash";

const MainMenu = ({ navigation }) => {
  const userContext = useContext(UserContext);

  const onPressButton = (page: string) => {
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
        <MenuButton
          text="Play"
          shadowColour={Colors.green}
          operation={() => onPressButton("Game Modes")}
        />
        <MenuButton
          text="Customise"
          shadowColour={Colors.red}
          operation={() => onPressButton("Customise")}
        />
        <MenuButton
          text="Statistics"
          shadowColour={Colors.red}
          operation={() => onPressButton("Statistics")}
        />
        <MenuButton
          text="Credits"
          shadowColour={Colors.red}
          operation={() => onPressButton("Credits")}
        />
        <MenuButton
          text="How To Play"
          shadowColour={Colors.purple}
          operation={() => onPressButton("HowToPlay")}
        />
      </>
    </BGWithImage>
  );
};

export default MainMenu;
