import React, { useContext } from "react";
import { ScrollView, View } from "react-native";
import { UserContext } from "../../../tools/UserContext";
import StatFull from "./StatFull";

const GameModeStats = () => {
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
          titleLabel="Classic Win Ratio"
          winValue={userContext.totalClassicWins}
          totalValue={userContext.totalClassicGames}
        />
        <StatFull
          titleLabel="Chasedown Win Ratio"
          winValue={userContext.totalChasedownWins}
          totalValue={userContext.totalChasedownGames}
        />
        <StatFull
          titleLabel="Hunt Win Ratio"
          winValue={userContext.totalHuntWins}
          totalValue={userContext.totalHuntGames}
        />
        <StatFull
          titleLabel="TagTeam Win Ratio"
          winValue={userContext.totalTagTeamWins}
          totalValue={userContext.totalTagTeamGames}
        />
      </View>
    </ScrollView>
  );
};

export default GameModeStats;
