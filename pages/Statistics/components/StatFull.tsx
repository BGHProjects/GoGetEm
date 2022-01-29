import React from "react";
import { View, Dimensions } from "react-native";
import { Colors } from "../../../constants/Colors";
import StatTitle from "./StatTitle";
import StatValue from "./StatValue";
import StatFraction from "./StatFraction";
import * as Progress from "react-native-progress";

interface StatFullProps {
  titleLabel: string;
  winValue: string | number;
  totalValue: string | number;
}

const StatFull = ({ titleLabel, winValue, totalValue }: StatFullProps) => {
  let valueLabel =
    Number(winValue) !== 0 && Number(totalValue) !== 0
      ? ((Number(winValue) / Number(totalValue)) * 100).toFixed(2) + "%"
      : "0%";
  const width = Dimensions.get("window").width;

  return (
    <View style={{ marginBottom: 40 }}>
      <StatTitle label={titleLabel} />
      <View style={{ flexDirection: "row", width: "80%" }}>
        <StatValue label={valueLabel} />
        <StatFraction winValue={winValue} totalValue={totalValue} />
      </View>
      <Progress.Bar
        width={width * 0.8}
        progress={
          Number(winValue) !== 0 && Number(totalValue) !== 0
            ? Number(Number(winValue) / Number(totalValue))
            : 0
        }
        style={{ marginTop: 20 }}
        color={Colors.green}
        unfilledColor={Colors.red}
        borderWidth={0}
      />
    </View>
  );
};

export default StatFull;
