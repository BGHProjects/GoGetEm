import React from "react";
import { slides } from "../../constants/customiseSlideContent";
import LiquidSwipe from "../../components/LiquidSwipe";
import { LiquidSwipeMenu } from "../../constants/types";

const Customise = ({ navigation }: any) => {
  return (
    <LiquidSwipe
      navigation={navigation}
      slidesInfo={slides}
      variant={LiquidSwipeMenu.Customise}
    />
  );
};

export default Customise;
