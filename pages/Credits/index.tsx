import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Divider } from "native-base";
import { Colors } from "../../constants/Colors";
import TitleText from "../../components/TitleText";
import { BackgroundWorks } from "../../constants/Attributions";
import * as WebBrowser from "expo-web-browser";
import { TouchableOpacity } from "react-native-gesture-handler";

import InGameTitle from "./components/inGameTitle";
import WorkName from "./components/WorkName";
import AuthorName from "./components/AuthorName";

const Credits = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.primaryBackground,
      }}
    >
      <TitleText text="Credits" style={{ marginBottom: 40 }} />
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        {BackgroundWorks.map((item) => (
          <TouchableOpacity
            onPress={() => WebBrowser.openBrowserAsync(item.link)}
          >
            <View style={styles.optionContainer}>
              <InGameTitle label={item.inGameName} />
              <Divider
                width="90%"
                alignSelf="center"
                bg={Colors.green}
                mb="10px"
                mt="3px"
              />
              <WorkName label={item.name} />
              <AuthorName label={item.author} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  inGameNameContainer: {
    alignSelf: "flex-start",
    width: "100%",
    alignItems: "center",
  },
  detailsContainer: {
    alignSelf: "flex-start",
    width: "90%",
    marginLeft: 20,
  },
  modeLabel: {
    fontFamily: "Main",
    color: "white",
    marginLeft: 10,
  },
  optionContainer: {
    width: 300,
    height: 120,
    borderRadius: 5,
    borderColor: Colors.green,
    borderWidth: 2,
    flexDirection: "column",
    marginBottom: 20,
  },
  selectionLabel: {
    fontFamily: "Main-Bold",
    color: "white",
    textAlign: "left",
  },
});

export default Credits;
