import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MenuButton from "../../components/MenuButton";
import { Colors } from "../../constants/Colors";
import Unlockables from "../../constants/Unlockables";
import { Screens } from "../../constants/types";
import UnlockedItemCard from "./components/UnlockedItemCard";
import { ScrollView } from "react-native-gesture-handler";

const animationDuration = 400;

const Unlocks = ({ navigation, route }: any) => {
  const newLevels = route.params;

  const [unlockedContent, setUnlockedContent] = useState<string[]>([]);

  useEffect(() => {
    let totalContent: string[] = [];

    newLevels.map((level: number) => {
      Unlockables[level as keyof typeof Unlockables].map((item: string) => {
        totalContent.push(item);
      });
    });

    setUnlockedContent(totalContent);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titleLabel}>You unlocked: </Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View>
          {unlockedContent &&
            unlockedContent.map((item, index) => {
              return (
                <UnlockedItemCard
                  item={item}
                  delay={index * animationDuration}
                  key={item as string}
                />
              );
            })}
        </View>
        <MenuButton
          text="Continue"
          operation={() => navigation.navigate(Screens.GameModes)}
          shadowColour={Colors.fluroBlue}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  titleLabel: {
    color: "white",
    fontFamily: "Main-Bold",
    fontSize: 30,
    marginBottom: 40,
    marginTop: 80,
  },
  scrollView: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Unlocks;
