import { Colors } from "./Colors";
import { Mode } from "./types";

export const timerDetails = [
  ["#00ff00", 0.4],
  ["#ffff00", 0.4],
  ["#ff0000", 0.2],
];

// Make sure these match gameModesContent.ts colours
export const BGColourOption: Record<Mode, string> = {
  [Mode.Classic]: Colors.darkPurple,
  [Mode.Chasedown]: Colors.cherryPink,
  [Mode.Hunt]: Colors.richPurple,
  [Mode.TagTeam]: Colors.softBlue,
};
