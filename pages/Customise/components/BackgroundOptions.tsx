import React, { useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import BGOption from "./BGOption";
import { UserContext } from "../../../tools/UserContext";
import { capitalize } from "lodash";

interface BackgroundOptionsProps {}

const BackgroundOptions = () => {
  const userContext = useContext(UserContext);
  return (
    <View style={styles.container}>
      <ScrollView>
        <BGOption
          modeLabel="Classic"
          selectionLabel={capitalize(userContext.classicBackground)}
          selection={userContext.classicBackground}
        />
        <BGOption
          modeLabel="Chasedown"
          selectionLabel={capitalize(userContext.chasedownBackground)}
          selection={userContext.chasedownBackground}
        />
        <BGOption
          modeLabel="Hunt"
          selectionLabel={capitalize(userContext.huntBackground)}
          selection={userContext.huntBackground}
        />
        <BGOption
          modeLabel="TagTeam"
          selectionLabel={capitalize(userContext.tagTeamBackground)}
          selection={userContext.tagTeamBackground}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});

export default BackgroundOptions;
