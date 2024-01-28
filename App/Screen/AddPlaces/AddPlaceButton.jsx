import { TouchableOpacity,Image, StyleSheet } from "react-native";
import React from 'react'
import { useNavigation } from "@react-navigation/native";

const AddPlaceButton = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    // Navigate to CalculateScreen when the button is pressed
    navigation.navigate("AddPlaceScreen");
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image
        source={require('./../../../assets/images/Plus.png')} // Update with the actual path to your image
        style={styles.image}
      />

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
    width: 50,
    height: 50,
    marginVertical:5,
  },

  image: {
    justifyContent:'center',
    width: 35,
    height: 35,
    //resizeMode: 'contain', 
    alignItems: "center",
    alignSelf:'center',
  },
});

export default AddPlaceButton;