import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const NearButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>ใกล้ที่สุด</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FF9A62",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    width: 120,
    height: 50,
  },
  text: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
  },
});

export default NearButton;
