import React, { useContext, useEffect, useReducer, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { UserContext, userReducer } from "../../tools/UserContext";
import { Colors } from "../../constants/Colors";
import * as firebase from "firebase";
import * as Device from "expo-device";
import NetInfo from "@react-native-community/netinfo";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

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
  apiKey: "AIzaSyDSsTjzfbbjRkPMImuMv8pChQZWnqg4o5A",
  authDomain: "gogetem-v1.firebaseapp.com",
  projectId: "gogetem-v1",
  storageBucket: "gogetem-v1.appspot.com",
  messagingSenderId: "410467064527",
  appId: "1:410467064527:web:33381c6e63fa6fe1d7f5ba",
  measurementId: "G-DP25PMTXE6",
  databaseURL: "https://gogetem-v1-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// function viewDatabase() {
//   const db = firebase.database();
//   //console.log("db ", db);
//   let uniqueName = Device.modelName + " " + Device.deviceName;
//   console.log("uniqueName ", uniqueName);

//   // Write to the database
//   //   db.ref("users/" + uniqueName).set({
//   //     username: uniqueName,
//   //   });

//   // Read from the database
//   //let dbRef = db.ref();
//   //   dbRef
//   //     .child("users")
//   //     .child(uniqueName)
//   //     .get()
//   //     .then((snapshot) => {
//   //       if (snapshot.exists()) {
//   //         //console.log("\nsnapshot.val() ", snapshot.val());
//   //         console.log("\nsnapshot.val().username ", snapshot.val().username);
//   //       } else {
//   //         console.log("User doesn't exist");
//   //       }
//   //     })
//   //     .catch((error) => {
//   //       console.error(error);
//   //     });
//   //   dbRef
//   //     .child("users")
//   //     .child("Some Other String")
//   //     .get()
//   //     .then((snapshot) => {
//   //       if (snapshot.exists()) {
//   //         //console.log("\nsnapshot.val() ", snapshot.val());
//   //         console.log("\nsnapshot.val().username ", snapshot.val().username);
//   //       } else {
//   //         console.log("User doesn't exist");
//   //       }
//   //     })
//   //     .catch((error) => {
//   //       console.error(error);
//   //     });

//   // Update a value in the database
//   db.ref("users/" + uniqueName).update({
//     connected: true,
//     defaultColour: "red",
//     controllerOutlineColour: "red",
//     controllerLeftButtonStyle: "default",
//     controllerLeftButtonColour: "default",
//     controllerRightButtonStyle: "default",
//     controllerRightButtonColour: "default",
//     controllerTopButtonStyle: "default",
//     controllerTopButtonColour: "default",
//     controllerBottomButtonStyle: "default",
//     controllerBottomButtonColour: "default",
//     totalExp: 0,
//     totalClassicWins: 0,
//     totalClassicGames: 0,
//     totalChasedownWins: 0,
//     totalChasedownGames: 0,
//     totalHuntWins: 0,
//     totalHuntGames: 0,
//     totalTagTeamWins: 0,
//     totalTagTeamGames: 0,
//     totalDiff1Wins: 0,
//     totalDiff1Games: 0,
//     totalDiff2Wins: 0,
//     totalDiff2Games: 0,
//     totalDiff3Wins: 0,
//     totalDiff3Games: 0,
//     totalDiff4Wins: 0,
//     totalDiff4Games: 0,
//   });
// }

/**
 *  Firebase necessities
 */

const Preparation = ({ navigation }) => {
  const userContext = useContext(UserContext);
  const [state, dispatch] = useReducer(userReducer, userContext);
  const [connection, setConnection] = useState<boolean | null>(null);

  const proceedtoSplash = () => {
    navigation.navigate("Splash");
  };

  /**
   * Internet Connection functions
   */

  const handleNoConnection = () => {
    dispatch({ type: "connectionChange", payload: false });
    navigation.navigate("Splash");
  };

  const connectionStatus = NetInfo.fetch().then((state) => {
    setConnection(state.isConnected);
  });

  const connectionAlert = () => {
    Alert.alert(
      "No Internet Connection",
      "In order to save your progress and customisations, and to unlock content, GoGetEm requires an internet connection.\nBut you can still play without one.",
      [
        {
          text: "OK I've connected",
          onPress: () => connectionStatus,
        },
        {
          text: "I'll play without an internet connection",
          onPress: () => handleNoConnection(),
        },
      ]
    );
  };

  useEffect(() => {
    if (connection !== null) {
      if (connection) {
        checkDatabaseForUser();
      } else {
        connectionAlert();
      }
    }
  }, [connection]);

  /**
   *  Database Checking functions
   */

  const checkDatabaseForUser = () => {
    const db = firebase.database();
    let uniqueName = Device.modelName + " " + Device.deviceName;
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
          createNewUser(uniqueName);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const setStateFromDatabase = (userDetails: object) => {
    dispatch({ type: "populateFromDatabase", payload: userDetails });
    navigation.navigate("Splash");
  };

  const createNewUser = (userName: string) => {
    dispatch({ type: "assignName", payload: userName });
    navigation.navigate("Splash");
  };

  // What actually happens when the page is loaded
  useEffect(() => {
    // Step 1 - Check Internet Connection
    if (!userContext.connected) {
      connectionAlert();
    } else {
      // Step 2 - Check if the user is in the database already
      checkDatabaseForUser();
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleLabel}>Preparing your account...</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleLabel: {
    fontSize: 24,
    color: "white",
    marginTop: height / 4,
    width: "100%",
    alignSelf: "center",
    textAlign: "center",
  },
  beginButton: {
    backgroundColor: "orange",
    width: width / 1.5,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: height / 24,
  },
  beginButtonLabel: {
    color: "white",
    fontSize: 25,
    paddingVertical: 10,
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
  },
});

export default Preparation;
