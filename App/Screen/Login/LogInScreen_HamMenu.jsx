import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import LogIn_HamMenu from "./LogIn_HamMenu";
import { TextInput } from "react-native-gesture-handler";
//import 'Logo' from '../PWin-App/assets/images/Logo.jpg';
export default function LogInScreen_HamMenu() {
  return (
    <View style={styles.container}>
      <LogIn_HamMenu/>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    display:'flex',
    flex:1,
  },
  LogoImage: {
    width: 200,
    height: 40,
    objectFit: "contain",
  },
});
