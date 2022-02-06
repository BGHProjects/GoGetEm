import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import BGOption from "./BGOption";

interface BackgroundOptionsProps {}

const BackgroundOptions = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <BGOption
          modeLabel="Classic"
          selectionLabel="Goggles"
          selection="goggles"
        />
        <BGOption
          modeLabel="Chasedown"
          selectionLabel="Snow"
          selection="snow"
        />
        <BGOption modeLabel="Hunt" selectionLabel="Gold" selection="gold" />
        <BGOption modeLabel="TagTeam" selectionLabel="Fire" selection="fire" />
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
