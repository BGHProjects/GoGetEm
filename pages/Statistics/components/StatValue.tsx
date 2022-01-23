import React from "react";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";

interface StatValueProps {
  label: number | string;
}

const StatValue = ({ label }: StatValueProps) => (
  <AutoSizeText
    fontSize={30}
    numberOfLines={1}
    mode={ResizeTextMode.max_lines}
    style={{
      color: "white",
      fontFamily: "Main-Bold",
      marginLeft: 20,
      marginTop: 10,
    }}
  >
    {label}
  </AutoSizeText>
);

export default StatValue;
