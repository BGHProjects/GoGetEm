import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Colors } from "../../../constants/Colors";
import { BackgroundWorks } from "../../../constants/Attributions";
import * as WebBrowser from "expo-web-browser";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ScrollView } from "react-native-gesture-handler";
import InGameTitle from "./InGameTitle";
import AuthorName from "./AuthorName";
import { Backgrounds } from "../../../constants/Images";

const ImageCredits = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <ScrollView>
        {BackgroundWorks.map((item) => (
          <TouchableOpacity
            onPress={() => WebBrowser.openBrowserAsync(item.link)}
            key={JSON.stringify(item)}
          >
            <View style={styles.optionContainer}>
              <InGameTitle label={item.inGameName} />
              <View style={styles.contentRowContainer}>
                <View style={styles.contentRowHalfContainer}>
                  <AuthorName label={item.author} prefix="Courtesy of " />
                </View>
                <View style={styles.contentRowHalfContainer}>
                  <ImageBackground
                    source={
                      Backgrounds[item.background as keyof typeof Backgrounds]
                    }
                    style={styles.bgImage}
                    resizeMode="cover"
                  />
                </View>
              </View>
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
    width: 200,
    height: 120,
    borderRadius: 5,
    borderColor: Colors.fluroBlue,
    borderWidth: 2,
    flexDirection: "column",
    marginBottom: 20,
    backgroundColor: Colors.primaryBackground,
  },
  selectionLabel: {
    fontFamily: "Main-Bold",
    color: "white",
    textAlign: "left",
  },
  bgImage: { width: "99%", height: "99%" },
  contentRowContainer: { width: "100%", height: 90, flexDirection: "row" },
  contentRowHalfContainer: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ImageCredits;
