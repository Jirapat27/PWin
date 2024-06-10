// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Logo from '../images/Logo.png';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 2000); // Change the time as needed

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Set your background color
  },
  logo: {
    resizeMode: 'contain',
    width: 200,
    height: 200,
  },
});

export default SplashScreen;
