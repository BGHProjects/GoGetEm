import React, { useState } from "react";

import Slider from "./Slider";
import Slide from "./Slide";
import { slides } from "../../../constants/gameModesContent";

const LiquidSwipe = ({ navigation }) => {
  // Start at the second one, because the first one is the Controls page
  const [index, setIndex] = useState(1);
  const prev = slides[index - 1];
  const next = slides[index + 1];
  return (
    <Slider
      key={index}
      index={index}
      setIndex={setIndex}
      prev={prev && <Slide slide={prev} />}
      next={next && <Slide slide={next} />}
    >
      <Slide navigation={navigation} slide={slides[index]!} />
    </Slider>
  );
};

export default LiquidSwipe;
