import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import SignUp_HamMenu from "./SignUp_HamMenu";
export default function SignUpScreen_HamMenu() {
  return (
    <View style={styles.container}>
      <SignUp_HamMenu/>
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
