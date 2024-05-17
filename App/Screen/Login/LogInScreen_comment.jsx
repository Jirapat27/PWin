import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import LogIn_comment from "./LogIn_comment";
import { TextInput } from "react-native-gesture-handler";
//import 'Logo' from '../PWin-App/assets/images/Logo.jpg';
export default function LogInScreen_comment() {
  return (
    <View style={styles.container}>
      <LogIn_comment/>
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
