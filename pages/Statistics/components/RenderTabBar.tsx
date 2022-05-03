import React from "react";
import { TabBar } from "react-native-tab-view";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";

// TODO Check if this dude is still begin used, otherwise delete
const RenderTabBar = (props) => {
  return (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "white" }}
      style={{ backgroundColor: "transparent" }}
      renderLabel={({ route, focused, color }) => (
        <AutoSizeText
          fontSize={16}
          numberOfLines={1}
          mode={ResizeTextMode.max_lines}
          style={{ color: "white", fontFamily: "Main" }}
        >
          {route.title}
        </AutoSizeText>
      )}
    />
  );
};

export default RenderTabBar;
