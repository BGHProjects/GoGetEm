import React, { useContext } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Colors } from "../../constants/Colors";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import { UserContext } from "../../tools/UserContext";
import { Backgrounds } from "../../constants/Images";
import LiquidSwipe from "../../components/LiquidSwipe";
import { slides } from "../../constants/statisticsSlideContent";
import { LiquidSwipeMenu } from "../../constants/types";

const topDivHeight = 200;

const Statistics = () => {
  const userContext = useContext(UserContext);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.primaryBackground }}>
      <ImageBackground
        resizeMode={"cover"}
        source={Backgrounds.mainMenu}
        style={styles.topDiv}
      >
        <View style={styles.pageContentContainer} />
        <View style={{ marginTop: topDivHeight / 2 - topDivHeight / 4 }}>
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
      <LiquidSwipe slidesInfo={slides} variant={LiquidSwipeMenu.Statistics} />
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
    height: topDivHeight,
    borderRadius: 40,
    marginTop: -50,
    justifyContent: "center",
  },
  pageContentContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.primaryBackground,
    opacity: 0.5,
    position: "absolute",
  },
});

export default Statistics;
