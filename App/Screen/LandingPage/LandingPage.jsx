import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Logo from '../../../assets/images/Logo.png'; // Update with the actual path to your logo

const LandingPage = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Add a delay (e.g., 2000 milliseconds) for a visual effect before navigating to the main screen
    const timeout = setTimeout(() => {
      navigation.replace('HomeScreen'); // Replace with the actual name of your main screen
    }, 2000);

    // Clean up the timeout when the component unmounts
    return () => clearTimeout(timeout);
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
    backgroundColor: '#FFF', // Set your desired background color
  },
  logo: {
    width: 200, // Adjust the width and height based on your logo dimensions
    height: 200,
    resizeMode: 'contain',
  },
});

export default LandingPage;
