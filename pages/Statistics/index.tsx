import React, { useState, useContext } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Colors } from "../../constants/Colors";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import { UserContext } from "../../tools/UserContext";
import { TabView, SceneMap } from "react-native-tab-view";

import BaseStats from "./components/BaseStats";
import DifficultyStats from "./components/DifficultyStats";
import GameModeStats from "./components/GameModeStats";
import RenderTabBar from "./components/RenderTabBar";
import { Backgrounds } from "../../constants/Backgrounds";

const Statistics = ({ navigation }) => {
  const userContext = useContext(UserContext);

  const renderScene = SceneMap({
    first: BaseStats,
    second: GameModeStats,
    third: DifficultyStats,
  });

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Base" },
    { key: "second", title: "Game Mode" },
    { key: "third", title: "Difficulty" },
  ]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.primaryBackground }}>
      <ImageBackground
        resizeMode={"cover"}
        source={Backgrounds.mainMenu}
        style={styles.topDiv}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: Colors.primaryBackground,
            opacity: 0.5,
            position: "absolute",
          }}
        />
        <View style={{ marginTop: 150 }}>
          <AutoSizeText
            fontSize={20}
            numberOfLines={1}
            mode={ResizeTextMode.max_lines}
            style={styles.levelLabel}
          >
            Level
          </AutoSizeText>
          <View style={styles.levelContainer}>
            <AutoSizeText
              fontSize={80}
              numberOfLines={1}
              mode={ResizeTextMode.max_lines}
              style={styles.levelFigure}
            >
              {userContext.level}
            </AutoSizeText>
          </View>
        </View>
      </ImageBackground>
      <TabView
        renderTabBar={RenderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        style={{ marginTop: 50 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  levelFigure: {
    color: "white",
    fontFamily: "Main-Bold",
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginVertical: 5,
    marginHorizontal: 5,
    marginBottom: 15,
  },
  levelContainer: {
    borderRadius: 90,
    height: 80,
    width: 80,
    borderColor: Colors.gold,
    backgroundColor: Colors.primaryBackground,
    borderWidth: 4,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  levelLabel: {
    color: "white",
    fontFamily: "Main-Bold",
    textAlign: "center",
    alignSelf: "center",
  },
  topDiv: {
    width: "100%",
    height: 200,
    borderRadius: 40,
    marginTop: -50,
    justifyContent: "center",
  },
});

export default Statistics;
