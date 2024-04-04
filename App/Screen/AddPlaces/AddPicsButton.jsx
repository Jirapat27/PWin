import { Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function AddButton() {
  const navigation = useNavigation();

  const handleAddPicsPress = () => {
    navigation.navigate("AddPics");
  };

  return (
    <TouchableOpacity  style={styles.container} onPress={handleAddPicsPress}>
      <Image
        source={require('./../../../assets/images/Close.png')}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      backgroundColor: '#FF9A62', // Customize the background color
      borderRadius: 10,
      alignItems: 'center',
      width: 50,
      height: 50,
      marginVertical: 5,
    },
    image: {
      justifyContent: 'center',
      width: 40,
      height: 40,
      alignItems: 'center',
      alignSelf: 'center',
      marginVertical: 5,
    },
  });