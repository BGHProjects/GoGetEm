import { Colors } from "./Colors";
import { Mode } from "./types";

export const timerDetails = [
  ["#00ff00", 0.4],
  ["#ffff00", 0.4],
  ["#ff0000", 0.2],
];

export const BGColourOption: Record<Mode, string> = {
  [Mode.Classic]: Colors.richPurple,
  [Mode.Chasedown]: Colors.cherryPink,
  [Mode.Hunt]: Colors.darkPurple,
  [Mode.TagTeam]: Colors.softBlue,
};
