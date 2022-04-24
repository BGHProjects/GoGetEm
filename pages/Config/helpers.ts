import { Mode } from "../../constants/types";

interface onPressSubmitProps {
  otherColours: string[];
  whichMode: string;
  selectedColour: string;
  selectedRound: string;
  timeLimit: string;
  difficulty: string;
  navigation: any;
}

export function onPressSubmit({
  otherColours,
  whichMode,
  selectedColour,
  selectedRound,
  timeLimit,
  difficulty,
  navigation,
}: onPressSubmitProps) {
  let configDetails;

  let configOptions: Record<string, any> = {
    Classic: {
      mode: Mode.Classic,
      flag: "config",
      colour: selectedColour,
      rounds: selectedRound,
      difficulty: difficulty,
      player2Colour: otherColours[0],
      player3Colour: otherColours[1],
    },
    Chasedown: {
      mode: Mode.Chasedown,
      flag: "config",
      colour: selectedColour,
      rounds: selectedRound,
      timeLimit: timeLimit,
      difficulty: difficulty,
      player2Colour: otherColours[0],
      player3Colour: otherColours[1],
    },
    Hunt: {
      mode: Mode.Hunt,
      flag: "config",
      colour: selectedColour,
      rounds: selectedRound,
      timeLimit: timeLimit,
      difficulty: difficulty,
      player2Colour: otherColours[0],
    },
    TagTeam: {
      mode: Mode.TagTeam,
      flag: "config",
      colour: selectedColour,
      rounds: selectedRound,
      difficulty: difficulty,
      player2Colour: otherColours[0],
      player3Colour: otherColours[1],
      player4Colour: otherColours[2],
      team1: [selectedColour, otherColours[0]],
      team1Target: otherColours[0],
      team2: [otherColours[1], otherColours[2]],
      team2Target: otherColours[1],
    },
  };

  configDetails = configOptions[whichMode];
  navigation.navigate(`${whichMode} Roles`, configDetails);
}

interface GetOtherColoursProps {
  colours: string[];
  selectedColour: string;
}

export function getOtherColours({
  colours,
  selectedColour,
}: GetOtherColoursProps) {
  colours = colours.filter((value) => value !== selectedColour);
  let player2colour = colours[Math.floor(Math.random() * colours.length)];
  colours = colours.filter((value) => value !== player2colour);
  let player3colour = colours[Math.floor(Math.random() * colours.length)];
  colours = colours.filter((value) => value !== player3colour);
  let player4colour = colours[Math.floor(Math.random() * colours.length)];

  return [player2colour, player3colour, player4colour];
}
