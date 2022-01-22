import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useContext, useReducer } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./tools/AppNavigation";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { userDetails, UserContext, userReducer } from "./tools/UserContext";
import NetInfo from "@react-native-community/netinfo";

export default function App() {
  let [fontsLoaded] = useFonts({
    "Ninja-Italics-Condensed": require("./assets/fonts/NinjaGardenCondensedItalic-Y4Rj.otf"),
    Main: require("./assets/fonts/Quicksand-Medium.ttf"),
    "Main-Bold": require("./assets/fonts/Quicksand-SemiBold.ttf"),
  });

  // Necessary to check and update internet connection
  const [connected, setConnected] = useState<boolean | null>(null);
  const userContext = useContext(UserContext);
  const [state, dispatch] = useReducer(userReducer, userContext);

  const checkConnection = NetInfo.fetch().then((state) => {
    setConnected(state.isConnected);
  });

  useEffect(() => {
    checkConnection;
  }, []);

  useEffect(() => {
    console.log("connected ", connected);
    if (connected !== null) {
      dispatch({ type: "connectionChange", payload: !userContext.connected });
    }
  }, [connected]);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <UserContext.Provider value={userDetails}>
          <AppNavigation />
        </UserContext.Provider>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
