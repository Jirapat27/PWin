import { Image, TouchableOpacity, StyleSheet } from "react-native";
import React from 'react';
import { useNavigation } from "@react-navigation/native";

export default function CalculateButton() {
  const navigation = useNavigation();

  const handleCalculatePress = () => {
    navigation.navigate("CalculateScreen");
  };

  return (
    <TouchableOpacity  style={styles.container} onPress={handleCalculatePress}>
      <Image
        source={require('./../../../assets/images/Price.png')}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FF9A62",
    borderRadius: 10,
    alignItems: "center",
    width: 50,
    height: 50,
    marginVertical: 5,
  },
  image: {
    justifyContent: 'center',
    width: 40,
    height: 40,
    alignItems: "center",
    alignSelf: 'center',
    marginVertical: 5,
  },
});