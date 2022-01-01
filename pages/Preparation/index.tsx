import React, { useContext, useEffect, useReducer } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import { UserContext, userReducer } from "../../tools/UserContext";
import * as firebase from "firebase";
import * as Device from "expo-device";

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

function viewDatabase() {
  const db = firebase.database();
  //console.log("db ", db);
  let uniqueName = Device.modelName + " " + Device.deviceName;
  console.log("uniqueName ", uniqueName);

  // Write to the database
  //   db.ref("users/" + uniqueName).set({
  //     username: uniqueName,
  //   });

  // Read from the database
  //let dbRef = db.ref();
  //   dbRef
  //     .child("users")
  //     .child(uniqueName)
  //     .get()
  //     .then((snapshot) => {
  //       if (snapshot.exists()) {
  //         //console.log("\nsnapshot.val() ", snapshot.val());
  //         console.log("\nsnapshot.val().username ", snapshot.val().username);
  //       } else {
  //         console.log("User doesn't exist");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  //   dbRef
  //     .child("users")
  //     .child("Some Other String")
  //     .get()
  //     .then((snapshot) => {
  //       if (snapshot.exists()) {
  //         //console.log("\nsnapshot.val() ", snapshot.val());
  //         console.log("\nsnapshot.val().username ", snapshot.val().username);
  //       } else {
  //         console.log("User doesn't exist");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });

  // Update a value in the database
  db.ref("users/" + uniqueName).update({
    connected: true,
    defaultColour: "red",
    controllerOutlineColour: "red",
    controllerLeftButtonStyle: "default",
    controllerLeftButtonColour: "default",
    controllerRightButtonStyle: "default",
    controllerRightButtonColour: "default",
    controllerTopButtonStyle: "default",
    controllerTopButtonColour: "default",
    controllerBottomButtonStyle: "default",
    controllerBottomButtonColour: "default",
    totalExp: 0,
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
  });
}

/**
 *  Firebase necessities
 */

const Preparation = ({ navigation }) => {
  const proceed = () => {
    navigation.navigate("Splash");
  };

  const userContext = useContext(UserContext);

  const [state, dispatch] = useReducer(userReducer, userContext);

  const updateState = () => {
    dispatch({ type: "connectionChange", payload: !userContext.connected });
    console.log("userContext.connected ", userContext.connected);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleLabel}>Setting up your account...</Text>
      <View style={styles.beginButton}>
        <TouchableOpacity onPress={() => proceed()}>
          <Text style={styles.beginButtonLabel}>Proceed</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.beginButton, { backgroundColor: "red" }]}>
        <TouchableOpacity onPress={() => viewDatabase()}>
          <Text style={styles.beginButtonLabel}>
            Update Context using Reducer
          </Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: "#000026",
  },
});

export default Preparation;
