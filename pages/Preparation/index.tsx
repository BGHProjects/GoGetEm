import React, { useContext, useEffect, useReducer, useState } from "react";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import { UserContext, userReducer } from "../../tools/UserContext";
import { Colors } from "../../constants/Colors";
import * as firebase from "firebase";
import * as Device from "expo-device";
import NetInfo from "@react-native-community/netinfo";
import { Asset } from "expo-asset";

import TitleText from "../../components/TitleText";
import LoadingDots from "react-native-loading-dots";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import ModalButton from "../../components/ModalButton";
import { Backgrounds } from "../../constants/Backgrounds";
import sha256 from "crypto-js/sha256";
import Base64 from "crypto-js/enc-base64";

/**
 * Plan for the Preparation Screen
 *
 * 1. Check for an internet connection
 *
 *      If there is no internet connection, alert the user
 *      that progress can only be saved with an internet
 *      connection
 *
 *      Allow them to choose to play without one of to
 *      fix their internet connection
 *
 * 2. Query the database using the phone's unique ID
 *
 *      If the user's phone's ID is in the database, update the context with those details
 *      If it is not, create a new entry for them in the database
 *
 * 3. Navigate to Main Menu
 *
 */

/**
 *  Firebase necessities start
 */

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDZLJAFidKviKafYx2vjhRsU0MXquBHog",
  authDomain: "gogetem-db-v1.firebaseapp.com",
  projectId: "gogetem-db-v1",
  storageBucket: "gogetem-db-v1.appspot.com",
  messagingSenderId: "329346400631",
  appId: "1:329346400631:web:62637c654bc3dbee23e172",
  measurementId: "G-2H4RX0C0RF",
  databaseURL: "https://gogetem-db-v1-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

/**
 *  Firebase necessities end
 */

const Preparation = ({ navigation }) => {
  const userContext = useContext(UserContext);
  const [state, dispatch] = useReducer(userReducer, userContext);
  const [connection, setConnection] = useState<boolean | null>(null);
  const [showModal, setShowModal] = useState(false);

  /**
   * Internet Connection functions
   */

  const handleNoConnection = () => {
    setShowModal(false);
    dispatch({ type: "connectionChange", payload: false });
    navigation.navigate("Main Menu");
  };

  const connectionStatus = NetInfo.fetch().then((state) => {
    setShowModal(false);
    setConnection(state.isConnected);
  });

  /**
   *  Database Checking functions
   */

  const checkDatabaseForUser = () => {
    const db = firebase.database();

    const uniqueName = Base64.stringify(
      sha256(Device.modelName + Device.deviceName)
    );
    db.ref()
      .child("users")
      .child(uniqueName)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          // Update state with user details
          setStateFromDatabase(snapshot.val());
        } else {
          // Create new user in the database
          createNewUser(db, uniqueName);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const setStateFromDatabase = (userDetails: object) => {
    console.log(`setStateFromDatabase was called`);
    dispatch({ type: "populateFromDatabase", payload: userDetails });
    navigation.navigate("Main Menu");
  };

  const createNewUser = (database, userName: string) => {
    //Write to the database
    console.log(`createNewUser was called`);
    database.ref("users/" + userName).set({
      username: userName,
      connected: true,
      defaultColour: "white",
      controllerOutlineColour: "outline-white",
      controllerLeftButton: "left-white-circle",
      controllerRightButton: "right-white-circle",
      controllerTopButton: "top-white-circle",
      controllerDownButton: "down-white-circle",
      level: 0,
      totalExp: 0,
      totalGames: 0,
      totalWins: 0,
      totalClassicWins: 0,
      totalClassicGames: 0,
      totalChasedownWins: 0,
      totalChasedownGames: 0,
      totalHuntWins: 0,
      totalHuntGames: 0,
      totalTagTeamWins: 0,
      totalTagTeamGames: 0,
      totalDiff1Wins: 0,
      totalDiff1Games: 0,
      totalDiff2Wins: 0,
      totalDiff2Games: 0,
      totalDiff3Wins: 0,
      totalDiff3Games: 0,
      totalDiff4Wins: 0,
      totalDiff4Games: 0,
      classicBackground: "forest",
      chasedownBackground: "mountains",
      huntBackground: "snow",
      tagTeamBackground: "forest",
      unlockedItems: [],
    });

    dispatch({ type: "assignName", payload: userName });
    navigation.navigate("Main Menu");
  };

  // Image loading stuff
  function cacheImages(images) {
    return Object.keys(images).map((image, index) => {
      return Asset.fromModule(images[image]).downloadAsync();
    });
  }

  function cacheAssetsAsync(images) {
    return Promise.all([...cacheImages(images)]);
  }

  async function _loadAssetsAsync() {
    try {
      await cacheAssetsAsync(Backgrounds);
    } catch (e) {
      console.log("e", e);
    } finally {
      console.log("images loaded?");
      //Step 1 - Check Internet Connection
      if (!userContext.connected) {
        setShowModal(true);
      } else {
        //Step 2 - Check if the user is in the database already
        checkDatabaseForUser();
      }
    }
  }

  // What actually happens when the page is loaded
  useEffect(() => {
    _loadAssetsAsync();
  }, []);

  useEffect(() => {
    if (connection !== null) {
      if (connection) {
        checkDatabaseForUser();
      } else {
        setShowModal(true);
      }
    }
  }, [connection]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <TitleText text="Preparing your account..." />
        <View style={styles.loadingAnimationContainer}>
          <LoadingDots
            colors={[Colors.gold, Colors.green, Colors.purple, Colors.orange]}
          />
        </View>
        {showModal && (
          <View style={styles.modalContainer}>
            <AutoSizeText
              fontSize={50}
              numberOfLines={2}
              mode={ResizeTextMode.max_lines}
              style={styles.modalTitle}
            >
              NO INTERNET CONNECTION DETECTED
            </AutoSizeText>
            <AutoSizeText
              fontSize={20}
              numberOfLines={6}
              mode={ResizeTextMode.max_lines}
              style={styles.modalContent}
            >
              In order to save your progress, customise, view stats, and to
              unlock content, GoGetEm requires an internet connection {"\n\n"}
              <Text style={{ color: Colors.green }}>
                But you can still play without one
              </Text>
            </AutoSizeText>

            <ModalButton
              text="OK, I've connected"
              shadowColour={Colors.gold}
              operation={() => connectionStatus}
            />
            <ModalButton
              text="I'll play offline"
              shadowColour={Colors.gold}
              operation={() => handleNoConnection()}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    height: 400,
    width: "95%",
    borderColor: Colors.orange,
    borderRadius: 10,
    borderWidth: 2,
    alignSelf: "center",
    marginTop: -200,
    backgroundColor: Colors.primaryBackground,
  },
  modalTitle: {
    color: Colors.orange,
    textAlign: "center",
    fontFamily: "Main-Bold",
    width: "95%",
    alignSelf: "center",
    marginTop: 10,
  },
  modalContent: {
    color: "white",
    textAlign: "center",
    fontFamily: "Main",
    width: "95%",
    alignSelf: "center",
    marginTop: 10,
  },
  contentContainer: {
    width: "75%",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 60,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
  },
  loadingAnimationContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignSelf: "center",
  },
});

export default Preparation;
