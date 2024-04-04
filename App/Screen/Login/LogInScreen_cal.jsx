import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Login_cal from "./LogIn_cal";
import { TextInput } from "react-native-gesture-handler";
//import 'Logo' from '../PWin-App/assets/images/Logo.jpg';
export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Login_cal/>
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
