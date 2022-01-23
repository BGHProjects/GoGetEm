import React, { useContext } from "react";
import { ScrollView, View } from "react-native";
import { HStack, Divider } from "native-base";
import { UserContext } from "../../../tools/UserContext";
import StatBasic from "./StatBasic";
import StatFull from "./StatFull";

const BaseStats = () => {
  const userContext = useContext(UserContext);
  let nextLevelExp = Math.ceil(100 * userContext.level ** 1.05);
  const expUntilNextLevel = nextLevelExp - userContext.totalExp;

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        backgroundColor: "transparent",
        alignItems: "center",
      }}
    >
      <View style={{ marginTop: 20, width: "80%" }}>
        <HStack style={{ justifyContent: "space-between" }}>
          <StatBasic titleLabel="Total Exp" valueLabel={userContext.totalExp} />
          <StatBasic
            titleLabel="Exp Until Next Level"
            valueLabel={expUntilNextLevel}
          />
        </HStack>
        <Divider my={10} />
        <StatFull
          titleLabel="Total Win Ratio"
          winValue={userContext.totalWins}
          totalValue={userContext.totalGames}
        />
      </View>
    </ScrollView>
  );
};

export default BaseStats;
