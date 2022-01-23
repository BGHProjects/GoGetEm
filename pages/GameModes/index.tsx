import React from "react";

import BGWithImage from "../../components/BGWithImage";
import MenuButton from "../../components/MenuButton";
import { Colors } from "../../constants/Colors";
import TitleText from "../../components/TitleText";

const GameModesScreen = ({ navigation }) => {
  const onPressButton = (gameMode: string) => {
    navigation.navigate(gameMode);
  };

  return (
    <BGWithImage image="gameModes">
      <TitleText text="Game Modes" style={{ marginBottom: 40 }} />
      <MenuButton
        text="Classic"
        shadowColour={Colors.gold}
        operation={() => onPressButton("Classic Config")}
      />
      <MenuButton
        text="Chasedown"
        shadowColour={Colors.blue}
        operation={() => onPressButton("Chasedown Config")}
      />
      <MenuButton
        text="Hunt"
        shadowColour={Colors.green}
        operation={() => onPressButton("Hunt Config")}
      />
      <MenuButton
        text="TagTeam"
        shadowColour={Colors.orange}
        operation={() => onPressButton("TagTeam Config")}
      />
      <MenuButton
        text="How to Play"
        shadowColour={Colors.purple}
        operation={() => console.log("Implement me!")}
      />
    </BGWithImage>
  );
};

export default GameModesScreen;
