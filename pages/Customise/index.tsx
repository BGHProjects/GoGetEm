import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { UserContext } from "../../tools/UserContext";
import { TabView, SceneMap } from "react-native-tab-view";

import RenderTabBar from "../Statistics/components/RenderTabBar";
import ControllerOption from "./components/ControllerOption";

const Customise = ({ navigation }) => {
  const userContext = useContext(UserContext);

  const Backgrounds = () => {
    return <></>;
  };

  const renderScene = SceneMap({
    first: ControllerOption,
    second: Backgrounds,
  });

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Controller" },
    { key: "second", title: "Backgrounds" },
  ]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.primaryBackground }}>
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

const styles = StyleSheet.create({});

export default Customise;
