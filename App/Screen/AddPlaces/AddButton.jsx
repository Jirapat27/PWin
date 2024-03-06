import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const AddButton = ({onPress, lat, long}) => {
  const navigation = useNavigation();

  const handleAddDetailPress = () => {

    // console.log('lat ',lat + " and "+long);
    navigation.navigate("AddDetailScreen", {
      latitude: lat,
      longitude: long,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleAddDetailPress}>
      <Text style={styles.text}>ยืนยันสถานที่</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FF9A62",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    width: 320,
    height: 55,
  },
  text: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
  },
});

export default AddButton;
