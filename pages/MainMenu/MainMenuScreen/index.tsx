import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

const MainMenuScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Main Menu Screen</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'blue',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default MainMenuScreen;