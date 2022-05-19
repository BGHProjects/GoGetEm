import { MARGIN_WIDTH, Side, WIDTH } from "../../Wave";

const onStartValue = (x: number, hasPrev: boolean, hasNext: boolean) => {
  "worklet";
  if (x <= MARGIN_WIDTH && hasPrev) return [Side.LEFT, 100];
  if (x >= WIDTH - MARGIN_WIDTH && hasNext) return [Side.RIGHT, 0];
  return [Side.NONE, 0];
};

export default onStartValue;
