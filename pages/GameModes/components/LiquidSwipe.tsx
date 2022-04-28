import React, { useState } from "react";

import Slider from "./Slider";
import Slide from "./Slide";
import { Colors } from "../../../constants/Colors";

const slides = [
  {
    color: Colors.purple,
    title: "Controls",
    description:
      "Press the buttons on your controller to move your player through the maze",
  },
  {
    color: Colors.blue,
    title: "Classic",
    description:
      "Catch your target, before they catch theirs... or before you're caught!",
  },
  {
    color: Colors.primaryBackground,
    title: "Chasedown",
    description:
      "Catch the target before the other player\nIf you're the target, survive until time runs out",
  },
  {
    color: Colors.red,
    title: "Hunt",
    description: "Catch more targets than your opponent before time runs out",
  },
  {
    color: Colors.orange,
    title: "TagTeam",
    description:
      "Each team has one chaser and one target\nCatch the other team's target before they catch yours to win",
  },
];

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
