import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import BGWithImage from "../../components/BGWithImage";
import { Colors } from "../../constants/Colors";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import { UserContext } from "../../tools/UserContext";
import { TabView, SceneMap } from "react-native-tab-view";

import BaseStats from "./components/BaseStats";
import DifficultyStats from "./components/DifficultyStats";
import GameModeStats from "./components/GameModeStats";
import RenderTabBar from "./components/RenderTabBar";

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
    <BGWithImage image={"mainMenu"}>
      <View style={styles.topDiv}>
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
      </View>
      <TabView
        renderTabBar={RenderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        style={{ marginTop: 50 }}
      />
    </BGWithImage>
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
    backgroundColor: Colors.buttonBackground,
    justifyContent: "center",
  },
});

export default Statistics;
