import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import SignUp from "./SignUp";
export default function SignUpScreen() {
  return (
    <View style={styles.container}>
      <SignUp/>
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
