import { Image, TouchableOpacity, StyleSheet } from "react-native";
import React from 'react';
import { useNavigation } from "@react-navigation/native";

const CalculateButton = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    // Navigate to CalculateScreen when the button is pressed
    //navigation.navigate("CalculateScreen");
    navigation.navigate("CalculateScreen");
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
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

export default CalculateButton;
