import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./tools/AppNavigation";
import { NativeBaseProvider } from "native-base";
import { UserContextProvider } from "./tools/UserContext";
import AnimatedSplashScreen from "react-native-animated-splash-screen";
import { Colors } from "./constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Logos } from "./constants/Images";
import AppLoading from "expo-app-loading";

export default function App() {
  // Handles state of app's readiness
  const [appReady, setAppReady] = useState(false);

  // Sets a storage value of true, so it can be accessed deeper in the app
  async function setLoadedToStorage() {
    await AsyncStorage.setItem("Loaded", "true");
  }

  const allImages = [
    require("./assets/ForestBG.jpg"),
    require("./assets/MountainsBG.jpg"),
    require("./assets/SnowBG.jpg"),
    require("./assets/MMBG.png"),
    require("./assets/GameModesBG.jpg"),
    require("./assets/AuroraBG.jpg"),
    require("./assets/FireBG.jpg"),
    require("./assets/GogglesBG.jpg"),
    require("./assets/GoldBG.jpg"),
    require("./assets/LiquidBG.jpg"),
    require("./assets/NeonCityBG.jpg"),
    require("./assets/NeonFutureBG.jpg"),
    require("./assets/SpaceBG.jpg"),
    require("./assets/logos/GoGetEmLogo.png"),
    require("./assets/logos/ClassicLogo.png"),
    require("./assets/logos/ChasedownLogo.png"),
    require("./assets/logos/HuntLogo.png"),
    require("./assets/logos/TagTeamLogo.png"),
  ];

  const cacheImages = async (images: any[]) => {
    return Promise.all([Asset.loadAsync(images)]);
  };

  let [fontsReady, error] = Font.useFonts({
    Main: require("./assets/fonts/Quicksand-Medium.ttf"),
    "Main-Bold": require("./assets/fonts/Quicksand-SemiBold.ttf"),
  });

  // Caches all the images in a synchronous way
  async function loadAssets() {
    const imageAssets = cacheImages(allImages);
    await Promise.all([imageAssets]);
    await setLoadedToStorage();

    // Manually give a slight delay for UI / UX
    setTimeout(() => {
      setAppReady(true);
    }, 1000);
  }

  useEffect(() => {
    if (fontsReady) {
      if (!appReady) {
        try {
          loadAssets();
        } catch (err) {
          console.warn(err);
        }
      }
    }
  }, [appReady, fontsReady]);

  if (!fontsReady) {
    return <AppLoading />;
  }

  return (
    <AnimatedSplashScreen
      translucent={true}
      isLoaded={appReady}
      logoImage={Logos.classicColoured}
      backgroundColor={Colors.primaryBackground}
      logoHeight={150}
      logoWidth={150}
    >
      <NavigationContainer>
        <UserContextProvider>
          <NativeBaseProvider>
            <AppNavigation />
          </NativeBaseProvider>
        </UserContextProvider>
      </NavigationContainer>
    </AnimatedSplashScreen>
  );
}
