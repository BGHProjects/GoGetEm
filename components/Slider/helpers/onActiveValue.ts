import { MARGIN_WIDTH, Side, WIDTH } from "../../Wave";

const onActiveValue = (x: number, side: Side) => {
  "worklet";
  // Assumes there will only be left or right
  if (side === Side.LEFT) return Math.max(x, MARGIN_WIDTH);
  return Math.max(WIDTH - x, MARGIN_WIDTH);
};

export default onActiveValue;
