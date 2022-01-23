import React from "react";
import BGWithImage from "../../components/BGWithImage";
import MenuButton from "../../components/MenuButton";
import { Colors } from "../../constants/Colors";
import TitleText from "../../components/TitleText";

const MainMenu = ({ navigation }) => {
  const onPressButton = (page: string) => {
    navigation.navigate(page);
  };

  return (
    <BGWithImage image={"mainMenu"}>
      <TitleText text="GoGetEm" style={{ marginBottom: 40 }} />
      <MenuButton
        text="Play"
        shadowColour={Colors.green}
        operation={() => onPressButton("Game Modes")}
      />
      <MenuButton
        text="Customise"
        shadowColour={Colors.red}
        operation={() => console.log("Implement me!")}
      />
      <MenuButton
        text="Statistics"
        shadowColour={Colors.red}
        operation={() => onPressButton("Statistics")}
      />
      <MenuButton
        text="Credits"
        shadowColour={Colors.red}
        operation={() => console.log("Implement me!")}
      />
    </BGWithImage>
  );
};

export default MainMenu;
