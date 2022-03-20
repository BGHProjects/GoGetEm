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

  switch (whichMode) {
    case "Classic":
      configDetails = {
        mode: "Classic",
        flag: "config",
        colour: selectedColour,
        rounds: selectedRound,
        difficulty: difficulty,
        player2Colour: otherColours[0],
        player3Colour: otherColours[1],
      };
      navigation.navigate("Classic Roles", configDetails);
      break;
    case "Chasedown":
      configDetails = {
        mode: "Chasedown",
        flag: "config",
        colour: selectedColour,
        rounds: selectedRound,
        timeLimit: timeLimit,
        difficulty: difficulty,
        player2Colour: otherColours[0],
        player3Colour: otherColours[1],
      };
      navigation.navigate("Chasedown Roles", configDetails);
      break;
    case "Hunt":
      configDetails = {
        mode: "Hunt",
        flag: "config",
        colour: selectedColour,
        rounds: selectedRound,
        timeLimit: timeLimit,
        difficulty: difficulty,
        player2Colour: otherColours[0],
      };
      navigation.navigate("Hunt Roles", configDetails);
      break;
    case "TagTeam":
      configDetails = {
        mode: "TagTeam",
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
      };
      navigation.navigate("TagTeam Roles", configDetails);
    default:
      break;
  }
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
