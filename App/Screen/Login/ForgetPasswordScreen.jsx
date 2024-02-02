import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import ForgetPassword from "./ForgetPassword.jsx";
//import 'Logo' from '../PWin-App/assets/images/Logo.jpg';
export default function ForgetPasswordScreen() {
  return (
    <View style={styles.container}>
      <ForgetPassword/>
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
