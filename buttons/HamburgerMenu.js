import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

import backButton from '../images/backButton.png';

const HamburgerMenu = ({ isOpen, onPress, size }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.backButton}>
        {isOpen ? (
            <Image source={backButton} style={[styles.icon]} />
        ) : (
          <>
            <View style={styles.bar}></View>
            <View style={styles.bar}></View>
            <View style={styles.bar}></View>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    padding: 10,
  },
  bar: {
    width: 30,
    height: 3,
    backgroundColor: '#FF9A62',
    marginVertical: 3,
  },
  backButton: {
    position: 'absolute',
    top: 13,
    left: 10,
    zIndex: 1,
  },
  icon:{
    width: 40,
    height: 40,
    },
});

export default HamburgerMenu;
