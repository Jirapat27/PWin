import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const HamburgerMenu = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.bar}></View>
      <View style={styles.bar}></View>
      <View style={styles.bar}></View>
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
