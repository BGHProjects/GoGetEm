import React from "react";
import LiquidSwipe from "../../components/LiquidSwipe";
import { slides } from "../../constants/creditsSlideContent";
import { LiquidSwipeMenu } from "../../constants/types";

const Credits = () => {
  return <LiquidSwipe slidesInfo={slides} variant={LiquidSwipeMenu.Credits} />;
};

export default Credits;
