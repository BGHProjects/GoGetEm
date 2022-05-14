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
import { flattenDeep } from "lodash";
import { Backgrounds, Youtubers, Logos } from "./constants/Images";

export default function App() {
  // Handles state of app's readiness
  const [appReady, setAppReady] = useState(false);

  let [fontsLoaded, error] = Font.useFonts({
    Main: require("./assets/fonts/Quicksand-Medium.ttf"),
    "Main-Bold": require("./assets/fonts/Quicksand-SemiBold.ttf"),
  });

  useEffect(() => {
    if (error !== null) {
      console.error("\n Error loading fonts : ", error);
    }
  }, [error]);

  // Sets a storage value of true, so it can be accessed deeper in the app
  async function setLoadedToStorage() {
    await AsyncStorage.setItem("Loaded", "true");
  }

  const cacheImages = (images: any[]) => {
    images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });
  };

  // Caches all the images in a synchronous way
  async function loadAssets() {
    const imageAssets = cacheImages(
      flattenDeep([
        Object.values(Backgrounds),
        Object.values(Youtubers),
        Object.values(Logos),
      ])
    );

    await Promise.all([...imageAssets]);
  }

  useEffect(() => {
    if (!appReady) {
      try {
        loadAssets();
      } catch (err) {
        console.warn(err);
      } finally {
        if (fontsLoaded) {
          // Just to handle any abnormalities
          // for better UX
          setTimeout(() => {
            setAppReady(true);
            setLoadedToStorage();
          }, 1000);
        }
      }
    }
  }, [appReady, fontsLoaded]);

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
