import { Colors } from "../../../constants/Colors";
import { capitalize } from "lodash";

export const determineDetails = (item: any) => {
  let colourUsed;
  let label;

  const itemParts = item.split("-");

  if (itemParts[0] === "background") {
    colourUsed = Colors.white;
    label = capitalize(itemParts[1]) + " " + capitalize(itemParts[0]);
  } else {
    colourUsed = Colors[itemParts[1]];
    if (itemParts[0] === "outline") {
      label = capitalize(itemParts[1]) + " " + capitalize(itemParts[0]);
    } else {
      label =
        capitalize(itemParts[1]) +
        " " +
        capitalize(itemParts[2]) +
        " " +
        capitalize(itemParts[0]) +
        " Button";
    }
  }

  return { colourUsed, label };
};

export default determineDetails;
