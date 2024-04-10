import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const HamburgerMenu = ({ isOpen, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {isOpen ? (
        <Icon name="chevron-left" size={36} color="#FF9A62" />
      ) : (
        <>
          <View style={styles.bar}></View>
          <View style={styles.bar}></View>
          <View style={styles.bar}></View>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 38,
    padding: 10,
  },
  bar: {
    width: 30,
    height: 3,
    backgroundColor: "#FF9A62",
    marginVertical: 3,
  },
});

export default HamburgerMenu;
