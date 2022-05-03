import React from "react";
import { View } from "react-native";
import StatTitle from "./StatTitle";
import StatValue from "./StatValue";
import StatFraction from "./StatFraction";
import StatProgressBar from "./StatProgressBar";

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

  return (
    <View style={{ width: 200, marginBottom: 40 }}>
      <StatTitle label={titleLabel} />
      <View style={{ width: "80%" }}>
        <StatValue label={valueLabel} />
        <StatFraction winValue={winValue} totalValue={totalValue} />
      </View>
      <StatProgressBar
        progressValue={Number(winValue)}
        completeValue={Number(totalValue)}
      />
    </View>
  );
};

export default StatFull;
