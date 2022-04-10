import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./tools/AppNavigation";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { NativeBaseProvider } from "native-base";
import { UserContextProvider } from "./tools/UserContext";

export default function App() {
  let [fontsLoaded] = useFonts({
    "Ninja-Italics-Condensed": require("./assets/fonts/NinjaGardenCondensedItalic-Y4Rj.otf"),
    Main: require("./assets/fonts/Quicksand-Medium.ttf"),
    "Main-Bold": require("./assets/fonts/Quicksand-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <UserContextProvider>
          <NativeBaseProvider>
            <AppNavigation />
          </NativeBaseProvider>
        </UserContextProvider>
      </NavigationContainer>
    );
  }
}
