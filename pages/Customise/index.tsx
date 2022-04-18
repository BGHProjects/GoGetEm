import React, { useState } from "react";
import { View } from "react-native";
import { Colors } from "../../constants/Colors";
import { TabView, SceneMap } from "react-native-tab-view";

import RenderTabBar from "../Statistics/components/RenderTabBar";
import ControllerOption from "./components/ControllerOption";

import BackgroundOptions from "./components/BackgroundOptions";

const Customise = ({ navigation }) => {
  const renderScene = SceneMap({
    first: ControllerOption,
    second: BackgroundOptions,
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

export default Customise;
