import React from "react";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";

interface StatFractionProps {
  winValue: number | string;
  totalValue: number | string;
}

const StatFraction = ({ winValue, totalValue }: StatFractionProps) => (
  <AutoSizeText
    fontSize={20}
    numberOfLines={1}
    mode={ResizeTextMode.max_lines}
    style={{
      color: "white",
      fontFamily: "Main-Bold",
      marginLeft: 20,
      marginTop: 10,
      alignSelf: "center",
    }}
  >
    ({winValue}/{totalValue})
  </AutoSizeText>
);

export default StatFraction;
