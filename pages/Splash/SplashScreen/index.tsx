import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SplashScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={{color: 'green'}}>Splash Screen</Text>
            <View style={{backgroundColor: 'red', width: width / 2}}>
                <TouchableOpacity onPress={()=>navigation.navigate('Main Menu')}>
                    <Text>Go to Main Menu</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default SplashScreen;