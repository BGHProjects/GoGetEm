import React from "react";

import BGWithImage from "../../components/BGWithImage";
import MenuButton from "../../components/MenuButton";
import { Colors } from "../../constants/Colors";
import TitleText from "../../components/TitleText";

const GameModesScreen = ({ navigation }) => {
  const onPressButton = (gameMode: string) => {
    navigation.navigate("Config", gameMode);
  };

  return (
    <BGWithImage image="gameModes">
      <TitleText text="Game Modes" style={{ marginBottom: 40 }} />
      <MenuButton
        text="Classic"
        shadowColour={Colors.gold}
        operation={() => onPressButton("Classic")}
      />
      <MenuButton
        text="Chasedown"
        shadowColour={Colors.blue}
        operation={() => onPressButton("Chasedown")}
      />
      <MenuButton
        text="Hunt"
        shadowColour={Colors.green}
        operation={() => onPressButton("Hunt")}
      />
      <MenuButton
        text="TagTeam"
        shadowColour={Colors.orange}
        operation={() => onPressButton("TagTeam")}
      />
      <MenuButton
        text="How to Play"
        shadowColour={Colors.purple}
        operation={() => navigation.navigate("HowToPlay")}
      />
    </BGWithImage>
  );
};

export default GameModesScreen;
