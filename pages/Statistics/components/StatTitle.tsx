import React from "react";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";

interface StatTitleProps {
  label: string;
}

const StatTitle = ({ label }: StatTitleProps) => (
  <AutoSizeText
    fontSize={16}
    numberOfLines={1}
    mode={ResizeTextMode.max_lines}
    style={{ color: "white", fontFamily: "Main-Bold" }}
  >
    {label}
  </AutoSizeText>
);

export default StatTitle;
