import React, { useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Mode } from "../../../constants/types";
import BGOption from "./BGOption";
import { UserContext } from "../../../tools/UserContext";
import { upperFirst, lowerFirst } from "lodash";

const BackgroundOptions = () => {
  const userContext = useContext(UserContext);
  const modes = Object.values(Mode);

  return (
    <View style={styles.container}>
      <ScrollView>
        {modes.map((mode: Mode) => {
          return (
            <BGOption
              key={mode}
              modeLabel={mode}
              selectionLabel={upperFirst(
                userContext[`${lowerFirst(mode)}Background`]
              )}
              selection={userContext[`${lowerFirst(mode)}Background`]}
            />
          );
        })}
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
