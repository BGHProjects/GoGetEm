import { Colors } from "./Colors";
import { Logos } from "./Images";

export const slides = [
  {
    color: Colors.orange,
    title: "Controls",
    description:
      "Press the buttons on your controller to move your player through the maze",
    image: "questionMark",
  },
  {
    color: Colors.richPurple,
    title: "Classic",
    description:
      "Catch your target, before they catch theirs... or before you're caught!",
    image: "classic",
  },
  {
    color: Colors.cherryPink,
    title: "Chasedown",
    description:
      "Catch the target before the other player\nIf you're the target, survive until time runs out",
    image: "chasedown",
  },
  {
    color: Colors.darkPurple,
    title: "Hunt",
    description: "Catch more targets than your opponent before time runs out",
    image: "hunt",
  },
  {
    color: Colors.softBlue,
    title: "TagTeam",
    description:
      "Each team has one chaser and one target\nCatch the other team's target before they catch yours to win",
    image: "tagTeam",
  },
];
