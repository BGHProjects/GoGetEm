import React, { useState } from "react";
import Slider from "./Slider";
import GameModeSlide from "../pages/GameModes/components/GameModeSlide";
import CustomiseSlide from "../pages/Customise/components/CustomiseSlide";
import { LiquidSwipeMenu } from "../constants/types";

interface LiquidSwipeProps {
  navigation?: any;
  slidesInfo: any[];
  variant: any;
}

const LiquidSwipe = ({ navigation, slidesInfo, variant }: LiquidSwipeProps) => {
  // Start at the second one, because the first one is the Controls page
  const [index, setIndex] = useState(
    variant === LiquidSwipeMenu.GameModes ? 1 : 0
  );
  const prev = slidesInfo[index - 1];
  const next = slidesInfo[index + 1];

  const slideOptions: Record<LiquidSwipeMenu, any> = {
    [LiquidSwipeMenu.GameModes]: {
      prevSlide: <GameModeSlide slide={prev} />,
      nextSlide: <GameModeSlide slide={next} />,
      initialSlide: (
        <GameModeSlide navigation={navigation} slide={slidesInfo[index]!} />
      ),
    },
    [LiquidSwipeMenu.Customise]: {
      prevSlide: <CustomiseSlide slide={prev} />,
      nextSlide: <CustomiseSlide slide={next} />,
      initialSlide: <CustomiseSlide slide={slidesInfo[index]!} />,
    },
  };

  return (
    <Slider
      key={index}
      index={index}
      setIndex={setIndex}
      prev={
        prev && slideOptions[variant as keyof typeof LiquidSwipeMenu].prevSlide
      }
      next={
        next && slideOptions[variant as keyof typeof LiquidSwipeMenu].nextSlide
      }
    >
      {slideOptions[variant as keyof typeof LiquidSwipeMenu].initialSlide}
    </Slider>
  );
};

export default LiquidSwipe;