import React from "react";
import LiquidSwipe from "../../components/LiquidSwipe";
import { slides } from "../../constants/gameModesContent";
import { LiquidSwipeMenu } from "../../constants/types";

const GameModes = ({ navigation }: any) => {
  return (
    <LiquidSwipe
      navigation={navigation}
      slidesInfo={slides}
      variant={LiquidSwipeMenu.GameModes}
    />
  );
};

export default GameModes;
