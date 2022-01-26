import React, { useContext } from "react";
import { ScrollView, View } from "react-native";
import { UserContext } from "../../../tools/UserContext";
import StatFull from "./StatFull";

const DifficultyStats = () => {
  const userContext = useContext(UserContext);

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: "transparent",
        alignItems: "center",
      }}
    >
      <View
        style={{
          marginTop: 20,
          width: "80%",
          justifyContent: "space-between",
        }}
      >
        <StatFull
          titleLabel="Meh Win Ratio"
          winValue={userContext.totalDiff1Wins}
          totalValue={userContext.totalDiff1Games}
        />
        <StatFull
          titleLabel="Oh OK Win Ratio"
          winValue={userContext.totalDiff2Wins}
          totalValue={userContext.totalDiff2Games}
        />
        <StatFull
          titleLabel="Hang On Win Ratio"
          winValue={userContext.totalDiff3Wins}
          totalValue={userContext.totalDiff3Games}
        />
        <StatFull
          titleLabel="What The Win Ratio"
          winValue={userContext.totalDiff4Wins}
          totalValue={userContext.totalDiff4Games}
        />
      </View>
    </ScrollView>
  );
};

export default DifficultyStats;
